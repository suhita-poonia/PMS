from django.contrib import admin
from django.utils.html import format_html
from .models import CustomUser, Student, Supervisor, Parcel, StudentFeedback
from .models import Notification
#from .models import SupervisorNotification

# admin.py - add at the top after imports
admin.site.site_header = "Parcel Management System Admin"
admin.site.site_title = "PMS Admin"
admin.site.index_title = "Welcome to PMS Admin Panel"

class ParcelInline(admin.TabularInline):
    model = Parcel
    extra = 0
    fields = ("order_id", "status", "arrival_date")

class StudentAdmin(admin.ModelAdmin):
    list_display = ("student_name", "student_id", "room_no", "hostel")
    inlines = [ParcelInline]

admin.site.register(CustomUser)
admin.site.register(Student, StudentAdmin)
admin.site.register(Supervisor)
admin.site.register(Parcel)

# admin.py
@admin.register(StudentFeedback)
class StudentFeedbackAdmin(admin.ModelAdmin):
    list_display = ('subject', 'user_email', 'user_btbt', 'rating_stars',
                    'feedback_type', 'contact_me', 'status_badge', 'submitted_at')
    list_filter = ('status', 'feedback_type', 'rating', 'submitted_at')
    search_fields = ('subject', 'user_email', 'user_btbt', 'message')
    readonly_fields = ('user_email', 'user_btbt', 'rating', 'feedback_type',
                       'subject', 'message', 'contact_me', 'anonymous', 'submitted_at')
    list_per_page = 20

    # ✅ Add this so admin can change status by clicking into the record
    fields = ('user_email', 'user_btbt', 'rating', 'feedback_type',
              'subject', 'message', 'contact_me', 'anonymous', 'submitted_at', 'status')

    def rating_stars(self, obj):
        stars = '★' * obj.rating + '☆' * (5 - obj.rating)
        return format_html('<span style="color:#fbbf24; font-size:1.1rem;">{}</span>', stars)
    rating_stars.short_description = 'Rating'

    def status_badge(self, obj):
        colors = {'pending': '#f59e0b', 'read': '#3b82f6', 'resolved': '#10b981'}
        color = colors.get(obj.status, '#6b7280')
        return format_html(
            '<span style="background:{}; color:white; padding:3px 10px; '
            'border-radius:12px; font-size:0.8rem;">{}</span>',
            color, obj.get_status_display()
        )
    status_badge.short_description = 'Status'

#@admin.register(Notification)
#class NotificationAdmin(admin.ModelAdmin):
#    list_display = ('title', 'student', 'notif_type', 'is_read', 'created_at')
#    list_filter = ('notif_type', 'is_read')
#    search_fields = ('title', 'student__student_name')


#@admin.register(SupervisorNotification)
#class SupervisorNotificationAdmin(admin.ModelAdmin):
#    list_display = ('title', 'notif_type', 'location', 'is_read', 'created_at')
#    list_filter = ('notif_type', 'location', 'is_read')
#    search_fields = ('title', 'message')