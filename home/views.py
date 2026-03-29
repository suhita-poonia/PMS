from django.shortcuts import render, HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .models import Student, Supervisor, Parcel, CustomUser
from django.contrib import messages
import json
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import StudentFeedback
from django.core.mail import send_mail
from django.utils import timezone
import random
from .models import OTPVerification
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.middleware.csrf import get_token
from .models import OTPVerification, Notification
from django.core.serializers.json import DjangoJSONEncoder


# Create your views here.
'''def index(request):
    return HttpResponse('This is homepage')'''

def forget_password(request):
    return render(request, 'forget_password.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    return render(request, 'contact.html')

def faq(request):
    return render(request, 'faq.html')

@login_required(login_url='index')
def feedback(request):
    return render(request, 'feedback.html')

def homepage(request):
    return render(request, 'homepage.html')

def index(request):
    return render(request, 'index.html')

def kutir_info(request):
    return render(request, 'kutir_info.html')

@login_required(login_url='index')
def notifications(request):
    return render(request, 'notifications.html')

@login_required(login_url='index')
def notificationspo(request):
    return render(request, 'notificationspo.html')

def postoffice_info(request):
    return render(request, 'postoffice_info.html')

def signup(request):
    if request.method == "POST":

        email = request.POST.get("email")
        password = request.POST.get("password")
        role = request.POST.get("role")

        # 🔴 CHECK IF USER ALREADY EXISTS
        if CustomUser.objects.filter(email=email).exists():
            messages.error(request, "Account already exists")
            return redirect("signup")

        # STUDENT SIGNUP
        if role == "student":

            try:
                student = Student.objects.get(student_email=email)

                user = CustomUser.objects.create_user(
                    username=email,
                    email=email,
                    password=password,
                    role="student",
                    is_staff=False,        
                    is_superuser=False
                )

                student.user = user
                student.save()

                messages.success(request, "Account created successfully")
                return redirect("index")

            except Student.DoesNotExist:
                messages.error(request, "Email not registered as student")


        # SUPERVISOR SIGNUP
        elif role == "supervisor":

            try:
                supervisor = Supervisor.objects.get(supervisor_email=email)

                user = CustomUser.objects.create_user(
                    username=email,
                    email=email,
                    password=password,
                    role="supervisor"
                )

                supervisor.user = user
                supervisor.save()

                messages.success(request, "Account created successfully")
                return redirect("index")

            except Supervisor.DoesNotExist:
                messages.error(request, "Email not registered as supervisor")


    return render(request, "signup.html")

def student_info(request):
    return render(request, 'student_info.html')

@login_required(login_url='index')
def studentdashboard(request):
    try:
        student = Student.objects.get(user=request.user)
    except Student.DoesNotExist:
        student = None
    return render(request, 'studentdashboard.html', {'student': student})


@login_required(login_url='index')
def get_student_parcel_stats(request):
    try:
        student = Student.objects.get(user=request.user)
    except Student.DoesNotExist:
        return JsonResponse({'error': 'Student not found'}, status=404)

    all_parcels = Parcel.objects.filter(student=student)
    online_count = all_parcels.filter(source='kutir').count()
    postal_count = all_parcels.filter(source='postoffice').count()

    return JsonResponse({
        'total': all_parcels.count(),
        'online': online_count,
        'postal': postal_count,
        'student_name': student.student_name,
        'student_email': student.student_email,
        'student_id': student.student_id,
        'mobile': student.student_mobile,
        'hostel': student.hostel,
        'room_no': student.room_no,
    })


@login_required(login_url='index')
def get_student_parcels(request):
    try:
        student = Student.objects.get(user=request.user)
    except Student.DoesNotExist:
        return JsonResponse({'error': 'Student not found'}, status=404)

    parcels = Parcel.objects.filter(student=student).order_by('-arrival_date').values(
        'order_id', 'status', 'arrival_date', 'source', 'hostel', 'room_no'
    )

    return JsonResponse({'parcels': list(parcels)})

@login_required(login_url='index')
def supervisor(request):
    try:
        supervisor = Supervisor.objects.get(user=request.user)
    except Supervisor.DoesNotExist:
        supervisor = None

    if request.method == "POST":
        action = request.POST.get("action")

        if action == "add":
            order_id       = request.POST.get("order_id", "").strip()
            student_name   = request.POST.get("student_name", "").strip()
            room_no        = request.POST.get("room_no", "").strip()
            hostel         = request.POST.get("hostel", "").strip()
            student_mobile = request.POST.get("student_mobile", "").strip()
            arrival_date   = request.POST.get("arrival_date")
            Parcel.objects.create(
                order_id=order_id,
                student_name=student_name,
                room_no=room_no,
                hostel=hostel,
                student_mobile=student_mobile,
                arrival_date=arrival_date,
                source='kutir'
            )
            messages.success(request, "📦 Parcel Added Successfully!")

        elif action == "update":
            order_id = request.POST.get("order_id", "").strip()
            status = request.POST.get("status", "").strip()
            try:
                parcel = Parcel.objects.get(order_id=order_id)
                parcel.status = status
                parcel.save()
                messages.success(request, "✏️ Parcel Status Updated Successfully")
            except Parcel.DoesNotExist:
                messages.error(request, "Parcel not found")

        return redirect('supervisor')

    return render(request, "supervisor.html", {'supervisor': supervisor})


@login_required(login_url='index')
def get_supervisor_stats(request):
    try:
        supervisor = Supervisor.objects.get(user=request.user)
    except Supervisor.DoesNotExist:
        return JsonResponse({'error': 'Supervisor not found'}, status=404)

    from django.utils import timezone
    today = timezone.now().date()

    all_parcels = Parcel.objects.filter(source='kutir')
    total = all_parcels.count()
    pending = all_parcels.exclude(status='Picked Up').count()
    delivered_today = all_parcels.filter(
        status='Picked Up',
        arrival_date=today
    ).count()
    hostels_served = all_parcels.values('hostel').distinct().count()
    # Active students = distinct students with kutir parcels
    active_students = all_parcels.values('student').distinct().count()

    # Success rate = picked up / total * 100
    picked_up = all_parcels.filter(status='Picked Up').count()
    success_rate = round((picked_up / total * 100), 1) if total > 0 else 0

    return JsonResponse({
        'total': total,
        'pending': pending,
        'delivered_today': delivered_today,
        'hostels_served': hostels_served,
        'active_students': active_students,
        'success_rate': success_rate,
        'supervisor_name': supervisor.supervisor_name,
        'supervisor_email': supervisor.supervisor_email,
        'supervisor_id': supervisor.supervisor_id,
        'supervisor_location': supervisor.supervisor_location,
    })

@login_required(login_url='index')
def supervisorpo(request):
    try:
        supervisor = Supervisor.objects.get(user=request.user)
    except Supervisor.DoesNotExist:
        supervisor = None

    if request.method == "POST":
        action = request.POST.get("action")

        if action == "add":
            order_id       = request.POST.get("order_id", "").strip()
            student_name   = request.POST.get("student_name", "").strip()
            room_no        = request.POST.get("room_no", "").strip()
            hostel         = request.POST.get("hostel", "").strip()
            student_mobile = request.POST.get("student_mobile", "").strip()
            arrival_date   = request.POST.get("arrival_date")
            Parcel.objects.create(
                order_id=order_id,
                student_name=student_name,
                room_no=room_no,
                hostel=hostel,
                student_mobile=student_mobile,
                arrival_date=arrival_date,
                source='postoffice'
            )
            messages.success(request, "📦 Parcel Added Successfully!")

        elif action == "update":
            order_id = request.POST.get("order_id", "").strip()
            status   = request.POST.get("status", "").strip()
            try:
                parcel = Parcel.objects.get(order_id=order_id)
                parcel.status = status
                parcel.save()
                messages.success(request, "✏️ Parcel Status Updated Successfully")
            except Parcel.DoesNotExist:
                messages.error(request, "Parcel not found")

        return redirect('supervisorpo')

    return render(request, "supervisorpo.html", {'supervisor': supervisor})


@login_required(login_url='index')
def get_supervisorpo_stats(request):
    try:
        supervisor = Supervisor.objects.get(user=request.user)
    except Supervisor.DoesNotExist:
        return JsonResponse({'error': 'Supervisor not found'}, status=404)

    from django.utils import timezone
    today = timezone.now().date()

    all_parcels = Parcel.objects.filter(source='postoffice')
    total = all_parcels.count()
    pending = all_parcels.exclude(status='Picked Up').count()
    delivered_today = all_parcels.filter(
        status='Picked Up',
        arrival_date=today
    ).count()

    # Count distinct hostels served
    hostels_served = all_parcels.values('hostel').distinct().count()

    return JsonResponse({
        'total': total,
        'pending': pending,
        'delivered_today': delivered_today,
        'hostels_served': hostels_served,
        'supervisor_name': supervisor.supervisor_name,
        'supervisor_email': supervisor.supervisor_email,
        'supervisor_id': supervisor.supervisor_id,
        'supervisor_location': supervisor.supervisor_location,
    })


def login_view(request):

    get_token(request)

    if request.method == "POST":
        username = request.POST.get("username").strip()
        password = request.POST.get("password").strip()
        role = request.POST.get("userType").strip()

        user = authenticate(request, username=username, password=password)

        if user is not None:

            # STUDENT
            if role == "student" and user.role == "student":
                login(request, user)
                return redirect("studentdashboard")

            # KUTIR SUPERVISOR
            elif role == "kutir" and user.role == "supervisor":
                try:
                    supervisor = Supervisor.objects.get(user=user)
                    if "kutir" in supervisor.supervisor_location.lower():
                        login(request, user)
                        return redirect("supervisor")
                    else:
                        return render(request, "index.html", {
                            "error": "You are not assigned to Kutir location."
                        })
                except Supervisor.DoesNotExist:
                    return render(request, "index.html", {"error": "Supervisor record not found."})

            # POST OFFICE SUPERVISOR
            elif role == "postoffice" and user.role == "supervisor":
                try:
                    supervisor = Supervisor.objects.get(user=user)
                    if "post" in supervisor.supervisor_location.lower():
                        login(request, user)
                        return redirect("supervisorpo")
                    else:
                        return render(request, "index.html", {
                            "error": "You are not assigned to Post Office location."
                        })
                except Supervisor.DoesNotExist:
                    return render(request, "index.html", {"error": "Supervisor record not found."})

            else:
                return render(request, "index.html", {"error": "Invalid role selected."})

        else:
            # Check if email exists at all
            User = get_user_model()
            if not User.objects.filter(username=username).exists():
                return render(request, "index.html", {"error": "You are not registered yet. Please sign up."})
            else:
                return render(request, "index.html", {"error": "Incorrect password."})

    return render(request, "index.html")


def track_parcel(request):
    if request.method == "GET":
        order_id = request.GET.get("order_id", "").strip()

        # If logged in as student, restrict to their parcels only
        if request.user.is_authenticated and hasattr(request.user, 'role') and request.user.role == 'student':
            try:
                student = Student.objects.get(user=request.user)
                parcel = Parcel.objects.get(order_id=order_id, student=student)
            except Student.DoesNotExist:
                return JsonResponse({"found": False, "error": "Student not found"})
            except Parcel.DoesNotExist:
                return JsonResponse({"found": False, "error": "No parcel found with this Order ID in your account"})
        else:
            # Supervisor can search any parcel
            try:
                parcel = Parcel.objects.get(order_id=order_id)
            except Parcel.DoesNotExist:
                return JsonResponse({"found": False})

        return JsonResponse({
            "found": True,
            "order_id": parcel.order_id,
            "student_name": parcel.student_name,
            "hostel": parcel.hostel,
            "room_no": parcel.room_no,
            "arrival_date": str(parcel.arrival_date) if parcel.arrival_date else None,
            "status": parcel.status,
        })


@csrf_exempt
@require_http_methods(["POST"])
def submit_feedback(request):
    try:
        data = json.loads(request.body)

        feedback = StudentFeedback.objects.create(
            user_email=data.get('userEmail', ''),
            user_btbt=data.get('userBTBT', ''),
            rating=data.get('rating', 0),
            feedback_type=data.get('type', 'other'),
            subject=data.get('subject', ''),
            message=data.get('message', ''),
            contact_me=data.get('contactMe', False),
            anonymous=data.get('anonymous', False),
        )

        return JsonResponse({'success': True, 'id': feedback.id})

    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)


@require_http_methods(["GET"])
def get_user_feedbacks(request):
    email = request.GET.get('email', '')
    feedbacks = StudentFeedback.objects.filter(
        user_email=email,
        anonymous=False
    ).values('id', 'subject', 'rating', 'feedback_type', 'message', 'status', 'submitted_at')[:5]

    return JsonResponse({'feedbacks': list(feedbacks)}, safe=False)


@csrf_exempt
@require_http_methods(["POST"])
def send_otp(request):
    try:
        data = json.loads(request.body)
        email = data.get('email', '').strip().lower()

        # Check email ends with banasthali.in
        if not email.endswith('@banasthali.in'):
            return JsonResponse({'success': False, 'error': 'Only Banasthali emails allowed.'})

        # Check if email exists in CustomUser
        User = get_user_model()
        if not User.objects.filter(email=email).exists():
            return JsonResponse({'success': False, 'error': 'No account found with this email.'})

        # Generate 6-digit OTP
        otp = str(random.randint(100000, 999999))

        # Save OTP to DB (invalidate old ones)
        OTPVerification.objects.filter(email=email, is_used=False).update(is_used=True)
        OTPVerification.objects.create(email=email, otp=otp)

        # Send OTP email
        send_mail(
            subject='BV ParcelPing - Password Reset OTP',
            message=f'''Hello,

Your OTP for password reset is: {otp}

This OTP is valid for 10 minutes. Do not share it with anyone.

If you did not request this, please ignore this email.

Regards,
BV ParcelPing Team''',
            from_email=None,  # uses DEFAULT_FROM_EMAIL
            recipient_list=[email],
            fail_silently=False,
        )

        return JsonResponse({'success': True, 'message': 'OTP sent to your email.'})

    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def verify_otp(request):
    try:
        data = json.loads(request.body)
        email = data.get('email', '').strip().lower()
        otp = data.get('otp', '').strip()

        record = OTPVerification.objects.filter(
            email=email,
            otp=otp,
            is_used=False
        ).order_by('-created_at').first()

        if not record:
            return JsonResponse({'success': False, 'error': 'Invalid OTP.'})

        if record.is_expired():
            return JsonResponse({'success': False, 'error': 'OTP has expired. Please request a new one.'})

        # Mark OTP as verified (but not used yet — used after password reset)
        # We just confirm it's valid here
        return JsonResponse({'success': True, 'message': 'OTP verified successfully.'})

    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def reset_password(request):
    try:
        data = json.loads(request.body)
        email = data.get('email', '').strip().lower()
        otp = data.get('otp', '').strip()
        new_password = data.get('newPassword', '')

        # Re-verify OTP before resetting
        record = OTPVerification.objects.filter(
            email=email,
            otp=otp,
            is_used=False
        ).order_by('-created_at').first()

        if not record:
            return JsonResponse({'success': False, 'error': 'Invalid or already used OTP.'})

        if record.is_expired():
            return JsonResponse({'success': False, 'error': 'OTP expired. Please request a new one.'})

        # Reset password in Django's user model
        User = get_user_model()
        user = User.objects.get(email=email)
        user.set_password(new_password)
        user.save()

        # Mark OTP as used
        record.is_used = True
        record.save()

        return JsonResponse({'success': True, 'message': 'Password reset successfully.'})

    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)

def logout_view(request):
    logout(request)
    return redirect('index')


@login_required(login_url='index')
def student_notifications(request):
    try:
        student = Student.objects.get(user=request.user)
    except Student.DoesNotExist:
        student = None
    return render(request, 'student_notifications.html', {'student': student})


@login_required(login_url='index')
def get_student_notifications(request):
    try:
        student = Student.objects.get(user=request.user)
    except Student.DoesNotExist:
        return JsonResponse({'notifications': []})

    notifs = Notification.objects.filter(student=student).values(
        'id', 'title', 'message', 'notif_type', 'is_read', 'created_at'
    )[:30]

    # Mark all as read when fetched
    Notification.objects.filter(student=student, is_read=False).update(is_read=True)

    return JsonResponse(
    {'notifications': list(notifs)},
    encoder=DjangoJSONEncoder   # ✅ handles datetime, date, Decimal etc.
    )


@login_required(login_url='index')
def get_unread_count(request):
    try:
        student = Student.objects.get(user=request.user)
        count = Notification.objects.filter(student=student, is_read=False).count()
    except Student.DoesNotExist:
        count = 0
    return JsonResponse({'count': count})


@login_required(login_url='index')
def get_supervisor_notifications(request):
    try:
        supervisor = Supervisor.objects.get(user=request.user)
    except Supervisor.DoesNotExist:
        return JsonResponse({'notifications': []})

    # Filter by location — kutir or postoffice
    location = 'kutir' if 'kutir' in supervisor.supervisor_location.lower() else 'postoffice'

    from .models import SupervisorNotification
    from django.core.serializers.json import DjangoJSONEncoder

    notifs = SupervisorNotification.objects.filter(location=location).values(
        'id', 'title', 'message', 'notif_type', 'is_read', 'created_at'
    )[:50]

    # Mark all as read
    SupervisorNotification.objects.filter(location=location, is_read=False).update(is_read=True)

    return JsonResponse({'notifications': list(notifs)}, encoder=DjangoJSONEncoder)


@login_required(login_url='index')
def get_supervisor_unread_count(request):
    try:
        supervisor = Supervisor.objects.get(user=request.user)
    except Supervisor.DoesNotExist:
        return JsonResponse({'count': 0})

    from .models import SupervisorNotification
    location = 'kutir' if 'kutir' in supervisor.supervisor_location.lower() else 'postoffice'
    count = SupervisorNotification.objects.filter(location=location, is_read=False).count()
    return JsonResponse({'count': count})