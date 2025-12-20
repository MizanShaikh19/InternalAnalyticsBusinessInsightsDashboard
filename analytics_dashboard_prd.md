# Product Requirements Document (PRD)
## Internal Analytics & Business Insights Dashboard

---

## 1. Purpose & Portfolio Objective

**Primary Goal:** Prove you can transform raw data into meaningful business insights using a real dashboard.

**What This Demonstrates:**
- Metrics-driven thinking, not just UI design
- Dashboard design for decision-makers
- Clean data architecture and presentation
- Internal tool development capabilities
- Analytical thinking + product judgment

**Portfolio Value:** Complements Project 1 by adding business intelligence and data visualization skills.

---

## 2. Problem Statement

Small teams and businesses track performance using scattered spreadsheets without centralized real-time visibility.

**Pain Points:**
- Data fragmented across multiple files
- No unified performance overview
- Time-consuming manual analysis
- Delayed or uninformed decision-making
- No trend visibility

**Solution:** A secure, lightweight internal dashboard that converts stored data into clear, actionable insights with filtering and KPI tracking.

---

## 3. Target Users

**Primary User:** Internal Admin/Manager
- Business owners
- Department managers  
- Junior analysts

**User Characteristics:**
- Needs quick performance snapshots
- Makes operational decisions daily
- Limited technical expertise
- Values clarity over complexity

**Out of Scope:** Public users, customers, external stakeholders

---

## 4. User Stories (Detailed)

### Epic 1: Authentication & Access

**US-1.1: Secure Login**
```
As an internal user
I want to log in securely with my email and password
So that I can access confidential business data

Acceptance Criteria:
- Email and password fields with validation
- "Show/hide password" toggle
- Error messages for invalid credentials
- Loading state during authentication
- Redirect to dashboard on success
- "Remember me" option (optional)
```

**US-1.2: Session Management**
```
As a logged-in user
I want my session to remain active while I work
So that I don't get logged out unexpectedly

Acceptance Criteria:
- Session persists for 24 hours
- Auto-redirect to login if session expires
- Clear session on logout
- Secure token storage
```

**US-1.3: Logout**
```
As a logged-in user
I want to securely log out
So that my data remains protected

Acceptance Criteria:
- Logout button in header/navigation
- Confirmation of logout action
- Session cleared completely
- Redirect to login page
```

---

### Epic 2: Dashboard Overview

**US-2.1: View Key Metrics**
```
As an internal user
I want to see critical KPIs immediately upon login
So that I understand business performance at a glance

Acceptance Criteria:
- 4-6 KPI summary cards displayed prominently
- Each card shows: metric name, current value, trend indicator
- Cards load within 2 seconds
- Visual distinction for positive/negative trends
- Metrics include: Total Revenue, Total Orders, Average Order Value, Growth Rate
```

**US-2.2: Default Time Range**
```
As an internal user
I want to see current month data by default
So that I'm viewing the most relevant recent performance

Acceptance Criteria:
- Dashboard loads with current month selected
- Date range displayed clearly at top
- Data automatically filtered to selected range
```

**US-2.3: Empty State Handling**
```
As an internal user
I want clear messaging when no data exists
So that I understand the system status

Acceptance Criteria:
- Friendly empty state message
- Guidance on what to expect when data exists
- No broken layouts or errors
```

---

### Epic 3: Data Filtering

**US-3.1: Filter by Date Range**
```
As an internal user
I want to filter data by custom date ranges
So that I can analyze specific time periods

Acceptance Criteria:
- Date range picker (start date + end date)
- Preset options: Last 7 days, Last 30 days, Last 90 days, This Year
- Apply button to trigger filter
- Reset button to clear filters
- KPIs and table update simultaneously
```

**US-3.2: Filter by Category**
```
As an internal user
I want to filter by business category
So that I can analyze specific segments

Acceptance Criteria:
- Dropdown showing all available categories
- "All Categories" option selected by default
- Category list dynamically populated from database
- Filter updates both KPIs and data table
- Selected filter persists during session
```

**US-3.3: Combined Filters**
```
As an internal user
I want to apply multiple filters simultaneously
So that I can perform granular analysis

Acceptance Criteria:
- Date + Category filters work together
- Clear indication of active filters
- "Clear All Filters" button
- Filter state visible in UI
```

---

### Epic 4: Data Table View

**US-4.1: View Transaction Records**
```
As an internal user
I want to see detailed transaction records in a table
So that I can review individual data points

Acceptance Criteria:
- Table shows: Date, Category, Amount, ID
- Sortable columns (click header to sort)
- 20 records per page initially
- Clean, readable formatting
- Amounts formatted as currency
- Dates in consistent format (MM/DD/YYYY)
```

**US-4.2: Table Pagination**
```
As an internal user
I want to navigate through multiple pages of data
So that I can review all records without overwhelming the interface

Acceptance Criteria:
- Pagination controls at table bottom
- Shows: Previous, Page numbers, Next
- Current page highlighted
- Total record count displayed
- Records per page selector (20, 50, 100)
```

**US-4.3: Table Responsiveness**
```
As an internal user
I want the table to work on different screen sizes
So that I can access data from any device

Acceptance Criteria:
- Horizontal scroll on mobile if needed
- Key columns prioritized on small screens
- Touch-friendly controls
- Readable text at all sizes
```

---

### Epic 5: Visual Feedback & UX

**US-5.1: Loading States**
```
As an internal user
I want visual feedback while data loads
So that I know the system is working

Acceptance Criteria:
- Skeleton loaders for KPI cards
- Loading spinner for data table
- "Loading..." text when appropriate
- No blank screens during load
```

**US-5.2: Error Handling**
```
As an internal user
I want clear error messages when something fails
So that I understand what went wrong

Acceptance Criteria:
- User-friendly error messages (not technical jargon)
- Retry options when appropriate
- No exposed error stack traces
- Fallback UI for failed components
```

**US-5.3: Success Feedback**
```
As an internal user
I want confirmation when actions succeed
So that I know my filters were applied

Acceptance Criteria:
- Subtle success indicators
- Updated data reflects filter changes
- No disruptive popups for routine actions
```

---

## 5. Page Specifications

### Page 1: Login Page (`/login`)

**Purpose:** Secure gateway to the dashboard

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│           [LOGO/TITLE]              │
│                                     │
│    ┌─────────────────────────┐     │
│    │                         │     │
│    │  Email                  │     │
│    │  [________________]     │     │
│    │                         │     │
│    │  Password               │     │
│    │  [________________] 👁  │     │
│    │                         │     │
│    │  [ ] Remember me        │     │
│    │                         │     │
│    │      [Login Button]     │     │
│    │                         │     │
│    │  [Error message area]   │     │
│    │                         │     │
│    └─────────────────────────┘     │
│                                     │
└─────────────────────────────────────┘
```

**Elements:**
- **Logo/Title:** "Business Analytics Dashboard"
- **Email Input:** 
  - Type: email
  - Placeholder: "admin@company.com"
  - Validation: Required, email format
- **Password Input:**
  - Type: password
  - Placeholder: "Enter password"
  - Show/hide toggle icon
  - Validation: Required, min 6 characters
- **Remember Me Checkbox:** Optional persistence
- **Login Button:**
  - Primary CTA style
  - Disabled state while loading
  - Shows spinner during authentication
- **Error Container:** Red text for auth failures

**States:**
- Default (idle)
- Loading (button disabled, spinner visible)
- Error (invalid credentials message)
- Success (redirect to dashboard)

**Validation Rules:**
- Email must be valid format
- Password required
- Show specific error: "Invalid email or password"

---

### Page 2: Dashboard Page (`/dashboard`)

**Purpose:** Central hub for all business metrics and data

**Layout:**
```
┌────────────────────────────────────────────────────────┐
│  [Logo]  Business Dashboard        [User] [Logout]    │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Filters Section                                       │
│  ┌──────────────────────────────────────────────┐     │
│  │ Date Range: [Last 30 Days ▼]                 │     │
│  │ Category: [All Categories ▼]                 │     │
│  │ [Apply Filters] [Clear All]                  │     │
│  └──────────────────────────────────────────────┘     │
│                                                        │
│  Key Metrics                                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐     │
│  │Revenue  │ │Orders   │ │Avg Order│ │Growth   │     │
│  │$45,230  │ │  342    │ │ $132.16 │ │ +12.5%  │     │
│  │↑ +8.2%  │ │↑ +5.1%  │ │↓ -2.3%  │ │↑ +12.5% │     │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘     │
│                                                        │
│  Recent Transactions                                   │
│  ┌──────────────────────────────────────────────┐     │
│  │ Date       Category    Amount      ID        │     │
│  ├──────────────────────────────────────────────┤     │
│  │ 12/15/24   Sales      $1,250.00   #001       │     │
│  │ 12/14/24   Service    $  340.00   #002       │     │
│  │ 12/14/24   Sales      $2,100.00   #003       │     │
│  │ ...                                           │     │
│  └──────────────────────────────────────────────┘     │
│                                                        │
│  [← Previous]  [1] [2] [3] ... [10]  [Next →]         │
│  Showing 1-20 of 342 records                           │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Components:**

#### Header Navigation
- **Logo:** Top-left, clickable (refreshes dashboard)
- **Title:** "Business Dashboard"
- **User Info:** Display email or username
- **Logout Button:** Top-right, clear action

#### Filters Section
- **Container:** Light background, subtle border
- **Date Range Dropdown:**
  - Options: Last 7 Days, Last 30 Days, Last 90 Days, This Year, Custom Range
  - Custom shows date pickers
- **Category Dropdown:**
  - Dynamically populated from database
  - "All Categories" default
- **Apply Button:** Primary style
- **Clear Button:** Secondary/ghost style

#### KPI Cards
- **Layout:** 4 cards in responsive grid
- **Each Card Contains:**
  - Metric name (top, small text)
  - Large number (center, bold)
  - Trend indicator (bottom, colored)
    - Green ↑ for positive
    - Red ↓ for negative
    - Gray → for neutral
- **Cards:**
  1. Total Revenue (sum of all amounts)
  2. Total Orders (count of records)
  3. Average Order Value (revenue / orders)
  4. Growth Rate (comparison to previous period)

#### Data Table
- **Column Headers:**
  - Date (sortable)
  - Category (sortable)
  - Amount (sortable, right-aligned)
  - ID (left-aligned)
- **Row Styling:**
  - Alternating row colors for readability
  - Hover state
  - Borders between rows
- **Empty State:** "No records found for selected filters"

#### Pagination
- **Controls:** Previous, page numbers, Next
- **Info:** "Showing X-Y of Z records"
- **Records Per Page:** Dropdown (20, 50, 100)

**Responsive Behavior:**
- Desktop (>1024px): 4 KPI cards per row
- Tablet (768-1024px): 2 KPI cards per row
- Mobile (<768px): 1 KPI card per row, horizontal scroll for table

**Loading States:**
- KPI cards: Skeleton loaders (animated gray boxes)
- Table: Spinner overlay with "Loading data..."

**Error States:**
- Network error: "Unable to load data. [Retry]"
- No data: Empty state illustration + message

---

## 6. Data Model

### Table: `users`
```sql
id            UUID PRIMARY KEY DEFAULT uuid_generate_v4()
email         TEXT UNIQUE NOT NULL
role          TEXT DEFAULT 'admin'
created_at    TIMESTAMP DEFAULT NOW()
```

### Table: `business_records`
```sql
id            UUID PRIMARY KEY DEFAULT uuid_generate_v4()
category      TEXT NOT NULL
amount        DECIMAL(10,2) NOT NULL
record_date   DATE NOT NULL
created_at    TIMESTAMP DEFAULT NOW()
```

**Sample Data:**
```
category     amount    record_date
Sales        1250.00   2024-12-15
Service       340.00   2024-12-14
Sales        2100.00   2024-12-14
Product       890.00   2024-12-13
Service       450.00   2024-12-12
```

---

## 7. Technical Implementation

### Database Queries

**Get KPI Metrics:**
```sql
SELECT 
  SUM(amount) as total_revenue,
  COUNT(*) as total_orders,
  AVG(amount) as avg_order_value
FROM business_records
WHERE record_date BETWEEN $1 AND $2
  AND ($3 = 'all' OR category = $3);
```

**Get Filtered Records with Pagination:**
```sql
SELECT *
FROM business_records
WHERE record_date BETWEEN $1 AND $2
  AND ($3 = 'all' OR category = $3)
ORDER BY record_date DESC
LIMIT $4 OFFSET $5;
```

**Get Available Categories:**
```sql
SELECT DISTINCT category
FROM business_records
ORDER BY category;
```

### Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE business_records ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can read all records
CREATE POLICY "Allow authenticated users to read"
ON business_records FOR SELECT
TO authenticated
USING (true);

-- Policy: Only admins can insert records (for data seeding)
CREATE POLICY "Allow admins to insert"
ON business_records FOR INSERT
TO authenticated
WITH CHECK (true);
```

---

## 8. Success Metrics

**Functional Success:**
- [ ] User can log in successfully
- [ ] Dashboard loads within 2 seconds
- [ ] All 4 KPIs calculate correctly
- [ ] Date filters update data accurately
- [ ] Category filters work as expected
- [ ] Table pagination functions properly
- [ ] Data sorting works on all columns
- [ ] Logout clears session completely

**User Experience Success:**
- [ ] Interface is intuitive (no instructions needed)
- [ ] Loading states prevent confusion
- [ ] Error messages are helpful
- [ ] Responsive design works on mobile
- [ ] No broken states or edge cases

**Portfolio Success:**
- [ ] Demonstrates analytical thinking
- [ ] Shows clean data architecture
- [ ] Proves dashboard design skills
- [ ] Looks professional in portfolio presentation

---

## 9. Out of Scope (Confirmed)

**Explicitly NOT included:**
- ❌ Data export (CSV/PDF download)
- ❌ Charts and graphs (only KPI cards)
- ❌ Real-time updates/WebSocket
- ❌ Multiple user roles beyond admin
- ❌ Email notifications
- ❌ AI-powered insights
- ❌ External API integrations
- ❌ Data entry forms (records added via SQL only)
- ❌ Advanced analytics or forecasting
- ❌ Mobile app version

---

## 10. Development Phases

### Phase 1: Foundation (Days 1-2)
- Set up Supabase project
- Create database tables
- Implement authentication
- Build login page

### Phase 2: Core Dashboard (Days 3-4)
- Build dashboard layout
- Implement KPI calculations
- Create data table
- Add basic styling

### Phase 3: Filtering & Polish (Days 5-6)
- Add date range filters
- Add category filters
- Implement pagination
- Add loading states

### Phase 4: Testing & Deployment (Day 7)
- Test all user flows
- Fix edge cases
- Deploy to Netlify/Vercel
- Seed production data

---

## 11. Portfolio Presentation

**Project Title:** "Internal Analytics Dashboard"

**Description:**
"A secure business intelligence dashboard for internal teams to track KPIs, analyze performance trends, and make data-driven decisions. Features real-time filtering, KPI tracking, and clean data visualization."

**Key Features to Highlight:**
- Secure authentication with RLS
- Dynamic KPI calculations
- Advanced filtering (date + category)
- Clean, professional UI
- Mobile-responsive design

**Technical Showcase:**
- PostgreSQL with complex queries
- Row Level Security implementation
- State management for filters
- Pagination logic
- Responsive grid layouts

---

## 12. Design System & Styling Guidelines

### Color Palette

**Primary Colors:**
```css
--primary-600: #2563eb    /* Primary buttons, links */
--primary-700: #1d4ed8    /* Primary hover states */
--primary-50:  #eff6ff    /* Primary backgrounds */
```

**Neutral Colors:**
```css
--gray-50:  #f9fafb    /* Page background */
--gray-100: #f3f4f6    /* Card backgrounds */
--gray-200: #e5e7eb    /* Borders, dividers */
--gray-400: #9ca3af    /* Placeholder text */
--gray-600: #4b5563    /* Secondary text */
--gray-900: #111827    /* Primary text */
```

**Semantic Colors:**
```css
--success-600: #16a34a    /* Positive trends, success */
--success-50:  #f0fdf4    /* Success backgrounds */

--error-600: #dc2626      /* Negative trends, errors */
--error-50:  #fef2f2      /* Error backgrounds */

--warning-600: #ea580c    /* Warnings */
--warning-50:  #fff7ed    /* Warning backgrounds */

--info-600: #0891b2       /* Info messages */
--info-50:  #ecfeff       /* Info backgrounds */
```

**Usage Examples:**
- Page background: `--gray-50`
- Card backgrounds: `white` or `--gray-100`
- Primary buttons: `--primary-600`
- Body text: `--gray-900`
- Secondary text: `--gray-600`
- Borders: `--gray-200`

---

### Typography

**Font Family:**
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             Roboto, sans-serif;
--font-mono: 'Fira Code', 'Courier New', monospace; /* For IDs, data */
```

**Font Sizes:**
```css
--text-xs:   0.75rem   /* 12px - Small labels */
--text-sm:   0.875rem  /* 14px - Secondary text */
--text-base: 1rem      /* 16px - Body text */
--text-lg:   1.125rem  /* 18px - Subheadings */
--text-xl:   1.25rem   /* 20px - Card titles */
--text-2xl:  1.5rem    /* 24px - Page titles */
--text-3xl:  1.875rem  /* 30px - Large numbers in KPIs */
--text-4xl:  2.25rem   /* 36px - Hero text */
```

**Font Weights:**
```css
--font-normal:    400
--font-medium:    500
--font-semibold:  600
--font-bold:      700
```

**Usage Guide:**
- Page titles: `text-2xl`, `font-bold`
- Section headings: `text-xl`, `font-semibold`
- Body text: `text-base`, `font-normal`
- KPI numbers: `text-3xl`, `font-bold`
- KPI labels: `text-sm`, `font-medium`, `--gray-600`
- Table headers: `text-sm`, `font-semibold`
- Table data: `text-sm`, `font-normal`
- Button text: `text-sm`, `font-medium`

---

### Spacing Scale

**Base Unit: 4px**
```css
--space-1:  0.25rem   /* 4px */
--space-2:  0.5rem    /* 8px */
--space-3:  0.75rem   /* 12px */
--space-4:  1rem      /* 16px */
--space-5:  1.25rem   /* 20px */
--space-6:  1.5rem    /* 24px */
--space-8:  2rem      /* 32px */
--space-10: 2.5rem    /* 40px */
--space-12: 3rem      /* 48px */
--space-16: 4rem      /* 64px */
```

**Common Uses:**
- Component padding: `--space-4` to `--space-6`
- Section spacing: `--space-8` to `--space-12`
- Small gaps: `--space-2` to `--space-3`
- Button padding: `--space-3` (vertical), `--space-6` (horizontal)

---

### Border Radius

```css
--radius-sm:  0.25rem  /* 4px - Inputs, small elements */
--radius-md:  0.375rem /* 6px - Buttons, cards */
--radius-lg:  0.5rem   /* 8px - Large cards */
--radius-xl:  0.75rem  /* 12px - Hero sections */
--radius-full: 9999px  /* Pills, avatars */
```

---

### Shadows

**Elevation System:**
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
/* Use for: Input fields, small hover effects */

--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1),
             0 2px 4px -2px rgb(0 0 0 / 0.1);
/* Use for: Cards, dropdowns */

--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1),
             0 4px 6px -4px rgb(0 0 0 / 0.1);
/* Use for: Modals, popovers */

--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1),
             0 8px 10px -6px rgb(0 0 0 / 0.1);
/* Use for: Important overlays */
```

---

### Component Specifications

#### Buttons

**Primary Button:**
```css
background: var(--primary-600);
color: white;
padding: 0.75rem 1.5rem;        /* 12px 24px */
border-radius: var(--radius-md);
font-size: var(--text-sm);
font-weight: var(--font-medium);
box-shadow: var(--shadow-sm);
transition: all 150ms ease;

/* Hover */
background: var(--primary-700);
box-shadow: var(--shadow-md);

/* Disabled */
background: var(--gray-300);
cursor: not-allowed;
```

**Secondary Button:**
```css
background: white;
color: var(--gray-700);
border: 1px solid var(--gray-300);
padding: 0.75rem 1.5rem;
border-radius: var(--radius-md);
font-size: var(--text-sm);
font-weight: var(--font-medium);
transition: all 150ms ease;

/* Hover */
background: var(--gray-50);
border-color: var(--gray-400);
```

**Ghost Button:**
```css
background: transparent;
color: var(--gray-600);
padding: 0.75rem 1.5rem;
border-radius: var(--radius-md);
font-size: var(--text-sm);
font-weight: var(--font-medium);

/* Hover */
background: var(--gray-100);
color: var(--gray-900);
```

---

#### Input Fields

**Text Input / Dropdown:**
```css
background: white;
border: 1px solid var(--gray-300);
border-radius: var(--radius-sm);
padding: 0.625rem 0.875rem;     /* 10px 14px */
font-size: var(--text-sm);
color: var(--gray-900);
transition: border-color 150ms ease;

/* Focus */
border-color: var(--primary-600);
outline: 2px solid var(--primary-50);
outline-offset: 2px;

/* Error State */
border-color: var(--error-600);
background: var(--error-50);

/* Disabled */
background: var(--gray-100);
color: var(--gray-400);
cursor: not-allowed;
```

**Input Label:**
```css
font-size: var(--text-sm);
font-weight: var(--font-medium);
color: var(--gray-700);
margin-bottom: var(--space-2);
display: block;
```

**Error Message:**
```css
font-size: var(--text-sm);
color: var(--error-600);
margin-top: var(--space-1);
```

---

#### Cards

**Standard Card:**
```css
background: white;
border: 1px solid var(--gray-200);
border-radius: var(--radius-lg);
padding: var(--space-6);
box-shadow: var(--shadow-sm);
```

**KPI Card:**
```css
background: white;
border: 1px solid var(--gray-200);
border-radius: var(--radius-lg);
padding: var(--space-6);
box-shadow: var(--shadow-sm);
transition: all 150ms ease;

/* Hover */
box-shadow: var(--shadow-md);
transform: translateY(-2px);

/* Structure */
.kpi-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--gray-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.kpi-value {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--gray-900);
  margin: var(--space-2) 0;
}

.kpi-trend {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.kpi-trend.positive { color: var(--success-600); }
.kpi-trend.negative { color: var(--error-600); }
.kpi-trend.neutral  { color: var(--gray-600); }
```

---

#### Data Table

**Table Container:**
```css
background: white;
border: 1px solid var(--gray-200);
border-radius: var(--radius-lg);
overflow: hidden;
```

**Table Element:**
```css
width: 100%;
border-collapse: collapse;
font-size: var(--text-sm);
```

**Table Header:**
```css
background: var(--gray-50);
border-bottom: 2px solid var(--gray-200);

th {
  padding: 0.75rem 1rem;         /* 12px 16px */
  text-align: left;
  font-weight: var(--font-semibold);
  color: var(--gray-700);
  text-transform: uppercase;
  font-size: var(--text-xs);
  letter-spacing: 0.05em;
}

/* Sortable headers */
th.sortable {
  cursor: pointer;
  user-select: none;
}

th.sortable:hover {
  background: var(--gray-100);
}
```

**Table Body:**
```css
td {
  padding: 1rem;
  border-bottom: 1px solid var(--gray-200);
  color: var(--gray-900);
}

tr:last-child td {
  border-bottom: none;
}

/* Hover effect */
tbody tr:hover {
  background: var(--gray-50);
}

/* Alternating rows (optional) */
tbody tr:nth-child(even) {
  background: var(--gray-50);
}

/* Column alignment */
.amount-column {
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-family: var(--font-mono);
}

.date-column {
  font-variant-numeric: tabular-nums;
}
```

---

#### Pagination

```css
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  border-top: 1px solid var(--gray-200);
  background: var(--gray-50);
}

.page-info {
  font-size: var(--text-sm);
  color: var(--gray-600);
}

.page-controls {
  display: flex;
  gap: var(--space-2);
}

.page-button {
  padding: 0.5rem 0.75rem;       /* 8px 12px */
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-sm);
  background: white;
  color: var(--gray-700);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all 150ms ease;
}

.page-button:hover {
  background: var(--gray-50);
  border-color: var(--gray-400);
}

.page-button.active {
  background: var(--primary-600);
  color: white;
  border-color: var(--primary-600);
}

.page-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

#### Loading States

**Skeleton Loader (for KPI cards):**
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--gray-200) 0%,
    var(--gray-300) 50%,
    var(--gray-200) 100%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
  border-radius: var(--radius-sm);
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Skeleton shapes */
.skeleton-text {
  height: 1rem;
  width: 100%;
  margin: 0.5rem 0;
}

.skeleton-number {
  height: 2.5rem;
  width: 60%;
  margin: 1rem 0;
}
```

**Spinner:**
```css
.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid var(--gray-200);
  border-top-color: var(--primary-600);
  border-radius: var(--radius-full);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

#### Filters Section

```css
.filters-container {
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  margin-bottom: var(--space-8);
}

.filters-row {
  display: flex;
  gap: var(--space-4);
  align-items: end;
  flex-wrap: wrap;
}

.filter-group {
  flex: 1;
  min-width: 200px;
}

.filter-actions {
  display: flex;
  gap: var(--space-3);
}
```

---

#### Header Navigation

```css
.header {
  background: white;
  border-bottom: 1px solid var(--gray-200);
  padding: var(--space-4) var(--space-6);
  box-shadow: var(--shadow-sm);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--gray-900);
  text-decoration: none;
}

.user-section {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.user-email {
  font-size: var(--text-sm);
  color: var(--gray-600);
}
```

---

### Layout Specifications

#### Page Container

```css
.page-container {
  min-height: 100vh;
  background: var(--gray-50);
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
}
```

#### Grid Systems

**KPI Grid:**
```css
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

/* Responsive */
@media (max-width: 1024px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
```

---

### Responsive Breakpoints

```css
/* Mobile first approach */
--breakpoint-sm: 640px   /* Small devices */
--breakpoint-md: 768px   /* Tablets */
--breakpoint-lg: 1024px  /* Desktops */
--breakpoint-xl: 1280px  /* Large desktops */
```

**Usage:**
```css
/* Mobile default */
.element { font-size: 14px; }

/* Tablet and up */
@media (min-width: 768px) {
  .element { font-size: 16px; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .element { font-size: 18px; }
}
```

---

### Accessibility Guidelines

**Focus States:**
```css
*:focus-visible {
  outline: 2px solid var(--primary-600);
  outline-offset: 2px;
}

/* Skip link for keyboard navigation */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary-600);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

**Semantic HTML Requirements:**
- Use `<button>` for clickable actions
- Use `<a>` only for navigation
- Use proper heading hierarchy (h1 → h2 → h3)
- Use `<label>` for all form inputs
- Use `<table>` for tabular data
- Include `alt` text for any icons

**ARIA Labels:**
- Sortable columns: `aria-sort="ascending"` or `aria-sort="descending"`
- Loading states: `aria-busy="true"`
- Pagination: `aria-label="Pagination navigation"`
- Current page: `aria-current="page"`

---

### Animation & Transitions

**Standard Transitions:**
```css
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
```

**Usage:**
- Hover effects: `--transition-fast`
- Color changes: `--transition-base`
- Layout shifts: `--transition-slow`
- Never animate: `height`, `width` (use `transform` instead)

---

### Icon System

**Recommended: Lucide Icons or Heroicons**

**Icon Sizes:**
```css
--icon-xs:  1rem    /* 16px */
--icon-sm:  1.25rem /* 20px */
--icon-md:  1.5rem  /* 24px */
--icon-lg:  2rem    /* 32px */
```

**Icon Usage:**
- Trend arrows: `--icon-xs`
- Button icons: `--icon-sm`
- Section icons: `--icon-md`
- Empty state icons: `--icon-lg`

**Required Icons:**
- `ChevronDown` - Dropdowns
- `ArrowUp` / `ArrowDown` - Trends
- `LogOut` - Logout button
- `Filter` - Filter section
- `Calendar` - Date picker
- `ChevronLeft` / `ChevronRight` - Pagination
- `Eye` / `EyeOff` - Password toggle
- `Loader2` - Loading spinner

---

## Final Notes

This PRD is **implementation-ready**. Every user story has acceptance criteria. Every page has a layout specification. Every feature has clear boundaries. Every component has exact styling specifications.

**With These Additions:**
- ✅ Complete color system with semantic tokens
- ✅ Typography scale with usage guide
- ✅ Spacing system based on 4px grid
- ✅ Component specifications with CSS
- ✅ Responsive breakpoints
- ✅ Accessibility requirements
- ✅ Animation standards

**Next Steps:**
1. Review and approve this detailed PRD
2. Set up development environment
3. Create a `styles.css` file with these variables
4. Begin Phase 1 implementation
5. Build iteratively following user stories

This project will take approximately **6-8 hours of focused development time** spread across 7 days.