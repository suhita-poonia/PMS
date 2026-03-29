from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import random

# Create your models here.

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('supervisor', 'Supervisor'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

class Student(models.Model):

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, null=True, blank=True)

    student_id = models.CharField(max_length=20, unique=True)
    student_name = models.CharField(max_length=100)
    student_email = models.EmailField(unique=True, default="unknown@banasthali.in")
    student_department = models.CharField(max_length=100, default="Unknown")
    student_year = models.IntegerField(default=1)
    student_mobile = models.CharField(max_length=15)
    room_no = models.CharField(max_length=10)
    hostel = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.student_name} ({self.student_id})"

class Parcel(models.Model):

    SOURCE_CHOICES = [
        ('kutir', 'Kutir'),
        ('postoffice', 'Post Office'),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True, blank=True, related_name="parcels")
    order_id = models.CharField(max_length=100, unique=True)
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default='kutir')  # ← ADD THIS

    student_name = models.CharField(max_length=100, null=True, blank=True)
    room_no = models.CharField(max_length=10, default=0)
    hostel = models.CharField(max_length=100, default="Unknown")
    student_mobile = models.CharField(max_length=15, default="Unknown")

    arrival_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50, default="Received")
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True, blank=True, related_name="parcels")
    order_id = models.CharField(max_length=100, unique=True)

    student_name = models.CharField(max_length=100, null=True, blank=True)
    room_no = models.CharField(max_length=10, default=0)
    hostel = models.CharField(max_length=100, default="Unknown")
    student_mobile = models.CharField(max_length=15, default="Unknown")

    arrival_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50, default="Received")

    def save(self, *args, **kwargs):

        if not self.student:

            hostel = (self.hostel or "").strip()
            room_no = (self.room_no or "").strip()
            name = (self.student_name or "").strip()
            mobile = (self.student_mobile or "").strip()

            student = None

            # Priority 1: hostel + room
            student = Student.objects.filter(
                hostel__iexact=hostel,
                room_no__iexact=room_no
            ).first()

            # Priority 2: hostel + room + name
            if not student and name:
                student = Student.objects.filter(
                    hostel__iexact=hostel,
                    room_no__iexact=room_no,
                    student_name__iexact=name
                ).first()

            # Priority 3: mobile number
            if not student and mobile:
                student = Student.objects.filter(
                    student_mobile=mobile
                ).first()

            print("Matched Student:", student)

            if student:
                self.student = student

        super().save(*args, **kwargs)

    def __str__(self):
        return self.order_id

class Supervisor(models.Model):

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, null=True, blank=True)

    supervisor_id = models.CharField(max_length=20, unique=True)
    supervisor_name = models.CharField(max_length=100)
    supervisor_email = models.EmailField(unique=True, default="unknown@banasthali.in")
    supervisor_location = models.CharField(max_length=100, default="Unknown")

    def __str__(self):
        return f"{self.supervisor_name} ({self.supervisor_id})"

class StudentFeedback(models.Model):
    FEEDBACK_TYPE_CHOICES = [
        ('service', 'Service Quality'),
        ('delivery', 'Delivery Experience'),
        ('app', 'App/Website'),
        ('other', 'Other'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('read', 'Read'),
        ('resolved', 'Resolved'),
    ]

    user_email = models.EmailField(blank=True)
    user_btbt = models.CharField(max_length=20, blank=True)
    rating = models.IntegerField()  # 1 to 5
    feedback_type = models.CharField(max_length=20, choices=FEEDBACK_TYPE_CHOICES)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    contact_me = models.BooleanField(default=False)
    anonymous = models.BooleanField(default=False)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.subject} - {self.user_email or 'Anonymous'}"


class OTPVerification(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def is_expired(self):
        # OTP expires after 10 minutes
        return timezone.now() > self.created_at + timezone.timedelta(minutes=10)

    def __str__(self):
        return f"{self.email} - {self.otp}"


class Notification(models.Model):
    TYPE_CHOICES = [
        ('parcel_added', 'Parcel Added'),
        ('status_update', 'Status Update'),
        ('feedback', 'Feedback'),
        ('alert', 'Alert'),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=200)
    message = models.TextField()
    notif_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='parcel_added')
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} → {self.student.student_name}"

    
class SupervisorNotification(models.Model):
    TYPE_CHOICES = [
        ('parcel_added', 'Parcel Added'),
        ('status_update', 'Status Update'),
        ('supervisor_added', 'Supervisor Added'),
        ('supervisor_deleted', 'Supervisor Deleted'),
    ]

    title = models.CharField(max_length=200)
    message = models.TextField()
    notif_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='parcel_added')
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=100, default='kutir')  # 'kutir' or 'postoffice'

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title