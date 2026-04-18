# RedNaz 40 Days of Prayer - Project Plan

## Project Overview
A mobile-first prayer application designed for a 40-day spiritual journey focusing on 5 specific individuals.

## Design Aesthetics
- **Theme:** Mobile First, Subdued, and Warm.
- **Palette:** - **Day Mode:** Cream (#FDF5E6) background, Deep Charcoal text (#2F2F2F), Burnt Orange (#CC5500) accents.
    - **Night Mode:** Deep Navy/Slate (#1A1A2E), Soft Amber text (#FFBF00), Muted Gold accents.
- **Vibe:** Gentle, reflective, and user-friendly.

## Technical Stack
- **Frontend:** React / Next.js (PWA recommended).
- **Backend/Database:** Supabase.
- **Styling:** Tailwind CSS.

## App Flow & Features

### 1. Authentication & Onboarding
- **Splash Page:** Initial landing (Already in place).
- **Login:** Username-based authentication (Already in place).
- **Initial Setup:** User enters 5 names of persons they are praying for. These are stored in Supabase linked to the `username`.

### 2. Personal Dashboard (The Hub)
- **Status:** Displays a personal splash page.
- **Action:** A prominent "Begin Day {number}" button.
- **Logic:** The day number increments automatically based on the user's last completed session.
- **Context:** The names of the 5 persons are displayed centered at the bottom of the screen.

### 3. The Daily Reading
Upon clicking "Begin", the app displays the specific content for that day:
- **Emphasis:** One of 8 rotating themes.
- **Day Header:** "Day {number}".
- **Title:** The specific title for the day's devotional.
- **Instructions:** Daily guidance (from a set of 40).
- **First Reading:** Scripture references (Optional: API lookup for full text).
- **Devotional Text:** The core reflection for the day.
- **Second Reading:** Closing scripture or reflection.
- **Call to Action:** "Pray for your 5" button at the bottom.

### 4. The Prayer Experience
A timed, meditative loop for the 5 chosen individuals:
- **Sequence:** Displays Person 1 name.
- **Timer:** A gentle 1-minute animation of time passing (breathing circle or slow-filling bar).
- **Notification:** A quiet sound/chime plays after 60 seconds.
- **Transition:** A button for the next person appears.
- **Repeat:** Repeat for all 5 persons.

### 5. Completion
- **The Amen:** After the 5th person, the button reads "Amen".
- **Logging:** Clicking "Amen" records the day as complete in Supabase and increments the user's progress.
- **Exit:** The screen blanks momentarily and returns the user to the Home Page.

## Database Schema (Proposed)
- **profiles:** `id`, `username`, `current_day`, `theme_preference`.
- **prayer_targets:** `user_id`, `name_1`, `name_2`, `name_3`, `name_4`, `name_5`.
- **content_master:** `day_number`, `emphasis_id`, `title`, `instr_id`, `scripture_1`, `devotional_body`, `scripture_2`.
- **lookup_tables:** Separate tables for the 8 Emphases and 40 Instructions.
