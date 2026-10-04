# HostelCheck.pk

React + Vite student hostel discovery MVP.

## Run
```bash
npm install
npm run dev
```

## Included
- Search by hostel, area or university
- Area, gender, rent, rating, distance and facility filters
- Hostel cards with real image URLs
- Hostel details, Google Maps and WhatsApp links
- Budget-Friendly and Verified badges
- Student review UI with 4 category ratings
- Favorites in app state
- Free hostel-owner listing form
- Responsive mobile/tablet/desktop design

## Production backend
The UI is intentionally ready for Supabase. Add:
- Supabase Auth (Google)
- profiles / students
- hostels
- hostel_reviews
- owner_listings
- storage bucket for hostel photos
- RLS policies that only verified students can create reviews
- admin verification for hostels and reviews

Cloudinary can be added for image delivery if you prefer it over Supabase Storage.
