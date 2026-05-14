# CLAUDE.md

Act as a veteran full-stack developer and UI/UX designer. Create a modern, responsive, secure, and user-friendly church website for Believers Bible Baptist Church.

The website should represent a warm, welcoming, Bible-centered church. The design must be clean, professional, and easy to navigate for church members, visitors, and guests.

Use the attached church logo as the basis for the branding. The theme color should not use the pink background from the image. Instead, base the colors on the elements inside the white circle of the logo:

Use these colors as the main design inspiration:

White – clean background and peaceful church feel
Royal blue / navy blue – main accent color from the text around the logo
Gold / yellow – highlight color from the roof/cross design
Red / crimson – small accent color from the cross
Dark gray / black – text and borders

The website should feel like a church ministry website: simple, spiritual, organized, and trustworthy.

Recommended Tech Stack

Use this tech stack:

Frontend
Next.js for the main website framework
React.js for reusable components
Tailwind CSS for styling
Framer Motion for smooth animations
Lucide React for clean icons
Backend
Next.js API Routes or Server Actions for form handling
PostgreSQL for storing prayer requests, events, contacts, and announcements
Prisma ORM for database management
Authentication / Admin
NextAuth.js or Clerk for admin login
Admin dashboard for managing events, schedules, ministries, and prayer requests
Deployment
Railway for full-stack deployment in one platform
or
Vercel + Neon if using separate frontend and database

Since the goal is to use one platform if possible, prefer Railway because it can host the frontend, backend, and database in one place.

Website Pages and Sections

Create the following main pages:

1. Homepage

The homepage should immediately show the identity of the church.

Include:

Church logo
Church name: Believers Bible Baptist Church
Warm welcome message
Short introduction about the church
Mission and vision statement
Featured Bible verse or inspirational quote
Call-to-action buttons:
“Join Our Worship Service”
“View Church Schedule”
“Send Prayer Request”

The homepage should also have a hero section with:

Church image or placeholder church photo
Elegant overlay using blue and gold tones
Short text such as:

“From the Cross, Through the Church, To the World”

Add a section for weekly regular services:

Sunday Worship Service
Wednesday Prayer Meeting / Bible Study
Saturday Youth Fellowship or Church Activity
2. About Us Page

Create an About Us page that explains the church background.

Include:

Church History

Add a section where the church can write its history, founding year, and ministry journey.

Mission and Vision

Display the church mission and vision clearly.

Core Beliefs and Values

Include belief cards such as:

The Bible as the Word of God
Salvation through Jesus Christ
Prayer and worship
Evangelism and missions
Fellowship and discipleship
Service to the community
Leadership Team

Create profile cards for:

Pastor
Elders
Ministry heads
Youth leader
Children’s ministry leader
Men’s and women’s group leaders

Each leadership card should include:

Photo
Name
Position
Short bio
Contact or ministry responsibility if needed
3. Worship & Services Page

Create a page for worship services and church schedules.

Include:

Regular Weekly Schedule

The website must always show these regular church days:

Sunday – Worship Service / Sunday School
Wednesday – Prayer Meeting / Bible Study
Saturday – Youth Fellowship / Visitation / Church Activity

Use clean schedule cards or a weekly timetable.

Example:

Day	Activity	Time
Sunday	Worship Service	9:00 AM
Sunday	Sunday School	10:30 AM
Wednesday	Prayer Meeting / Bible Study	7:00 PM
Saturday	Youth Fellowship / Church Activity	3:00 PM

The exact time should be editable later.

Location

Add a section for the church address.

Include:

Church location text
Google Maps embed
“Get Directions” button
Online Streaming

Add optional buttons for:

Facebook Live
YouTube Channel
Online Sermons

If streaming links are not available yet, create placeholders that can be updated later.

4. Ministries & Programs Page

Create a ministries page showing the different church ministries.

Include ministry cards for:

Youth Ministry
Children’s Ministry
Women’s Ministry
Men’s Ministry
Music / Choir Ministry
Outreach Ministry
Missions Ministry
Bible Study Groups
Community Feeding Program
Charity and Visitation Program

Each ministry card should include:

Ministry name
Short description
Photo or icon
Leader name if available
Button: “Learn More” or “Join This Ministry”

Also include a Volunteer Opportunities section where users can express interest in serving.

5. Events Calendar Page

Create an Events Calendar page.

The calendar should show:

Upcoming church events
Weekly services
Retreats
Fellowships
Special programs
Outreach activities
Anniversaries
Conferences
Prayer meetings
Bible studies

Important requirement:

The calendar must always include recurring weekly schedules for:

Sunday
Wednesday
Saturday

The calendar should support:

Monthly view
List view
Event details modal/page
Event title
Date
Time
Location
Description
Ministry involved

Add color labels:

Blue for worship services
Gold for special events
Red for important announcements
Gray for regular meetings

Admin should be able to add, edit, and delete events from the dashboard.

6. Contact Us Page

Create a contact page with complete church contact information.

Include:

Contact Details
Email address
Phone number
Office hours
Church address
Social media links
Contact Form

Fields:

Full name
Email address
Phone number
Subject
Message
Prayer Request Form

Create a separate prayer request form with:

Full name
Contact information, optional
Prayer request category
Prayer message
Option to mark request as private

Prayer request submissions should be stored securely and only visible to authorized admin users.

7. Church Songs and Choir Videos Page

Create a special page for church songs and choir videos.

Include:

Church Songs Section

Allow the church to post:

Song title
Lyrics
Author or source
Category such as hymn, choir, special number, congregational song
Choir Videos Section

Allow embedding or uploading links from:

YouTube
Facebook videos
Google Drive links if needed

Each video card should show:

Video title
Short description
Date
Ministry or choir group involved
8. Admin Dashboard

Create a secure admin dashboard for church staff.

Admin should be able to manage:

Homepage content
Church information
Pastor and leadership profiles
Weekly schedules
Calendar events
Ministries
Contact messages
Prayer requests
Church songs
Choir videos
Announcements

Admin dashboard must have:

Secure login
Role-based access
Simple sidebar navigation
Add, edit, delete functions
Form validation
Confirmation before deleting data
UI/UX Design Instructions

Use a clean church-themed design.

Design style:

White background
Navy blue headers and buttons
Gold highlights for important sections
Red accent only for small details like cross icons or alerts
Rounded cards
Soft shadows
Large readable fonts
Mobile-friendly layout
Simple navigation menu
Sticky header
Footer with church information

Header navigation should include:

Home
About Us
Worship & Services
Ministries
Events Calendar
Songs & Videos
Contact Us

Footer should include:

Church logo
Church name
Short mission statement
Contact information
Social media links
Copyright text
Security Requirements

Implement basic security best practices:

Form validation on frontend and backend
Protect admin routes
Use authentication for admin dashboard
Sanitize user input
Prevent SQL injection using Prisma ORM
Use environment variables for secrets
Add rate limiting for contact and prayer request forms
Use HTTPS in production
Do not expose database credentials
Add proper error handling
Add spam protection for forms, such as CAPTCHA or honeypot field
Final Output Expected

Build a complete church website for Believers Bible Baptist Church with a professional design based on the logo colors. The website must be responsive, easy to maintain, secure, and ready for future church content updates.

The final website should include:

Public church website
Events calendar with recurring Sunday, Wednesday, and Saturday schedules
Contact and prayer request forms
Ministries page
Worship schedule page
Church songs and choir videos page
Admin dashboard for content management
Secure full-stack implementation using the recommended tech stack

Make the code clean, reusable, and production-ready. Use proper folder structure, reusable components, clear naming, and comments only where necessary.