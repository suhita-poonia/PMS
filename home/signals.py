from django.db.models.signals import post_save, post_delete
from django.db.models import Q
from django.dispatch import receiver
from .models import Parcel, StudentFeedback, Notification, Supervisor, SupervisorNotification


@receiver(post_save, sender=Parcel)
def parcel_notification(sender, instance, created, **kwargs):

    # ── Student notification ──────────────────────────────────────
    if instance.student:
        if created:
            already_exists = Notification.objects.filter(
                student=instance.student,
                notif_type='parcel_added',
                message__icontains=instance.order_id
            ).exists()
            if not already_exists:
                source_label = "Kutir" if instance.source == "kutir" else "Post Office"
                Notification.objects.create(
                    student=instance.student,
                    title=f"📦 New Parcel Arrived at {source_label}",
                    message=f"Your parcel (Order ID: {instance.order_id}) has arrived at {source_label}. "
                            f"Arrival date: {instance.arrival_date or 'N/A'}.",
                    notif_type='parcel_added'
                )
        else:
            already_exists = Notification.objects.filter(
                Q(message__icontains=instance.order_id) &
                Q(message__icontains=instance.status),
                student=instance.student,
                notif_type='status_update'
            ).exists()
            if not already_exists:
                Notification.objects.create(
                    student=instance.student,
                    title="🔄 Parcel Status Updated",
                    message=f"Your parcel (Order ID: {instance.order_id}) status has been updated to '{instance.status}'.",
                    notif_type='status_update'
                )

    # ── Supervisor notification ───────────────────────────────────
    location = instance.source
    if created:
        already_exists = SupervisorNotification.objects.filter(
            notif_type='parcel_added',
            message__icontains=instance.order_id
        ).exists()
        if not already_exists:
            SupervisorNotification.objects.create(
                title="📦 New Parcel Added",
                message=f"Parcel (Order ID: {instance.order_id}) added for {instance.student_name or 'Unknown'} "
                        f"in {instance.hostel or 'Unknown'}, Room {instance.room_no or 'N/A'}. "
                        f"Arrival date: {instance.arrival_date or 'N/A'}.",
                notif_type='parcel_added',
                location=location
            )
    else:
        already_exists = SupervisorNotification.objects.filter(
            Q(message__icontains=instance.order_id) &
            Q(message__icontains=instance.status),
            notif_type='status_update',
            location=location
        ).exists()
        if not already_exists:
            SupervisorNotification.objects.create(
                title="🔄 Parcel Status Updated",
                message=f"Parcel (Order ID: {instance.order_id}) status changed to '{instance.status}' "
                        f"for {instance.student_name or 'Unknown'}.",
                notif_type='status_update',
                location=location
            )


@receiver(post_save, sender=Supervisor)
def supervisor_added_notification(sender, instance, created, **kwargs):
    if not created:
        return
    location = (instance.supervisor_location or '').lower()
    tag = 'kutir' if 'kutir' in location else 'postoffice'
    SupervisorNotification.objects.create(
        title="👤 New Supervisor Added",
        message=f"{instance.supervisor_name} has been added as a supervisor at {instance.supervisor_location}.",
        notif_type='supervisor_added',
        location=tag
    )


@receiver(post_delete, sender=Supervisor)
def supervisor_deleted_notification(sender, instance, **kwargs):
    location = (instance.supervisor_location or '').lower()
    tag = 'kutir' if 'kutir' in location else 'postoffice'
    SupervisorNotification.objects.create(
        title="🗑️ Supervisor Removed",
        message=f"{instance.supervisor_name} has been removed from {instance.supervisor_location}.",
        notif_type='supervisor_deleted',
        location=tag
    )


@receiver(post_save, sender=StudentFeedback)
def feedback_notification(sender, instance, created, **kwargs):
    if not created or instance.anonymous:
        return
    from .models import Student
    try:
        student = Student.objects.get(student_email=instance.user_email)
        Notification.objects.create(
            student=student,
            title="✅ Feedback Submitted",
            message=f"Your feedback '{instance.subject}' has been submitted successfully. "
                    f"Status: {instance.get_status_display()}.",
            notif_type='feedback'
        )
    except Student.DoesNotExist:
        pass