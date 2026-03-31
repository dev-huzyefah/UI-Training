# Bootstrap and Custom Classes Documentation

## Bootstrap Classes and Their Purpose

### Layout & Grid Classes

| Class             | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| `container-fluid` | Full-width container spanning entire viewport width  |
| `row`             | Creates a horizontal group of columns (grid row)     |
| `col-lg-6`        | Column taking 6/12 width on large screens and above  |
| `col-md-6`        | Column taking 6/12 width on medium screens and above |
| `col-lg-12`       | Full-width column on large screens and above         |
| `col-lg-4`        | Column taking 4/12 width on large screens            |
| `col-md-12`       | Full-width column on medium screens                  |
| `col-lg-3`        | Column taking 3/12 width on large screens            |
| `col-12`          | Full-width column on all screen sizes                |

### Spacing Classes

| Class     | Purpose                                                |
| --------- | ------------------------------------------------------ |
| `mb-5`    | Margin bottom (large spacing - 3rem)                   |
| `mb-3`    | Margin bottom (medium spacing - 1rem)                  |
| `mb-4`    | Margin bottom (1.5rem)                                 |
| `m-5`     | Margin on all sides (3rem)                             |
| `mt-0`    | Margin top 0 (removes top margin)                      |
| `ms-auto` | Margin start (left) auto - pushes element to the right |
| `ps-0`    | Padding start (left) 0 - removes left padding          |
| `pt-2`    | Padding top (small spacing - 0.5rem)                   |
| `pt-3`    | Padding top (medium spacing - 1rem)                    |
| `pt-5`    | Padding top (large spacing - 3rem)                     |
| `pl-3`    | Padding left (1rem)                                    |
| `p-5`     | Padding on all sides (3rem)                            |
| `g-4`     | Gap/gutter between grid items (1.5rem)                 |

### Display & Visibility Classes

| Class        | Purpose                                        |
| ------------ | ---------------------------------------------- |
| `d-none`     | Display none (hides element)                   |
| `d-lg-block` | Display block on large screens and above       |
| `d-xl-block` | Display block on extra-large screens and above |
| `d-md-block` | Display block on medium screens and above      |

### Text & Typography Classes

| Class                                                          | Purpose                                                        |
| -------------------------------------------------------------- | -------------------------------------------------------------- |
| `text-center`                                                  | Center-aligns text                                             |
| `text-left`                                                    | Left-aligns text (deprecated in Bootstrap 5, use `text-start`) |
| `text-dark`                                                    | Dark text color (dark gray/black)                              |
| `text-secondary`                                               | Secondary text color (lighter gray for descriptions)           |
| `h1-custom` → Bootstrap part is: `text-dark`, `text-secondary` | Text color utilities                                           |
| `list-font`                                                    | Custom class for list font styling                             |

### Navigation Classes

| Class                 | Purpose                                                            |
| --------------------- | ------------------------------------------------------------------ |
| `navbar`              | Navigation bar component container                                 |
| `navbar-expand-md`    | Navbar expands (shows horizontally) at medium breakpoint and above |
| `navbar-light`        | Light-themed navbar (uses dark text on light background)           |
| `navbar-brand`        | Logo/brand element in navbar                                       |
| `navbar-toggler`      | Hamburger menu button for mobile collapse                          |
| `navbar-toggler-icon` | Icon inside the toggle button                                      |
| `collapse`            | Collapsible content (starts hidden)                                |
| `navbar-collapse`     | Collapsible navbar menu section                                    |
| `navbar-nav`          | Navigation list container inside navbar                            |
| `nav-item`            | Individual navigation item                                         |
| `nav-link`            | Navigation link styling                                            |
| `dropdown`            | Dropdown menu container                                            |
| `dropdown-toggle`     | Triggers dropdown menu (shows caret icon)                          |

### Button Classes

| Class          | Purpose                                           |
| -------------- | ------------------------------------------------- |
| `btn`          | Base button component styles                      |
| `btn-lg`       | Large-sized button                                |
| `rounded-pill` | Makes button fully rounded (border-radius: 50rem) |

### Card Component Classes

| Class          | Purpose                                           |
| -------------- | ------------------------------------------------- |
| `card`         | Card component container                          |
| `h-100`        | Height 100% - makes card full height of container |
| `card-img-top` | Image positioned at top of card                   |
| `card-body`    | Content area inside card                          |
| `card-title`   | Card title heading                                |
| `card-text`    | Card text content                                 |

### Form Classes

| Class              | Purpose                                 |
| ------------------ | --------------------------------------- |
| `form-group`       | Groups form elements with spacing       |
| `form-control`     | Styles input, textarea, select elements |
| `form-check`       | Checkbox/radio wrapper container        |
| `form-check-input` | Checkbox/radio input styling            |
| `form-check-label` | Label for checkbox/radio                |

### Carousel Classes

| Class                        | Purpose                             |
| ---------------------------- | ----------------------------------- |
| `carousel`                   | Carousel/slider component container |
| `carousel-slide`             | Adds slide animation to carousel    |
| `carousel-inner`             | Inner content container of carousel |
| `carousel-item`              | Individual slide in carousel        |
| `carousel-item active`       | Currently visible/active slide      |
| `carousel-control-prev`      | Previous button for carousel        |
| `carousel-control-next`      | Next button for carousel            |
| `carousel-control-prev-icon` | Icon for previous button            |
| `carousel-control-next-icon` | Icon for next button                |

### Utility Classes

| Class      | Purpose                                                   |
| ---------- | --------------------------------------------------------- |
| `mx-auto`  | Margin left and right auto - centers element horizontally |
| `w-100`    | Width 100%                                                |
| `bg-light` | Light background color                                    |

### Background & Color Classes

| Class      | Purpose                                 |
| ---------- | --------------------------------------- |
| `bg-light` | Light background (off-white/light gray) |

### Bootstrap Icons (Utility)

| Class         | Purpose                             |
| ------------- | ----------------------------------- |
| `bi bi-check` | Checkmark icon from Bootstrap Icons |
| `bi bi-x`     | X/cross icon from Bootstrap Icons   |

---

## Custom Classes and Their Purpose

### Section & Layout Custom Classes

| Class                  | Purpose                                    |
| ---------------------- | ------------------------------------------ |
| `title`                | Header section main wrapper                |
| `title-2`              | Main heading/section title styling         |
| `title-heading`        | Primary heading in hero section            |
| `title-padding`        | Padding around titles                      |
| `Title-container`      | Hero section container                     |
| `lean-section`         | Light/minimal section styling with padding |
| `Testmonial-container` | Testimonials section wrapper               |
| `About-Team`           | About team section styling                 |
| `customer-info`        | Customer information section               |
| `contact-bg`           | Contact section background                 |
| `Footer`               | Footer section styling                     |

### Navigation Custom Classes

| Class      | Purpose                                                         |
| ---------- | --------------------------------------------------------------- |
| `Fixed`    | Fixed navigation bar (note: should be `fixed-top` in Bootstrap) |
| `nav-logo` | Logo image sizing in navbar                                     |
| `nav-text` | Navigation link text styling                                    |

### Button Custom Classes

| Class            | Purpose                                    |
| ---------------- | ------------------------------------------ |
| `custom-button`  | Custom button styling and colors           |
| `btn-1`          | Button variant 1 - primary action button   |
| `btn-2`          | Button variant 2 - secondary action button |
| `starter-button` | Button for pricing starter plan            |
| `btn-set`        | Button container with spacing              |
| `head-btn-div`   | Header button container                    |

### Typography Custom Classes

| Class          | Purpose                       |
| -------------- | ----------------------------- |
| `h1-custom`    | Custom h1 heading styles      |
| `h3-custom`    | Custom h3 heading styles      |
| `custom-p`     | Custom paragraph styling      |
| `service-para` | Service description paragraph |
| `abt-para`     | About section paragraph       |
| `design-p`     | Design section paragraph      |
| `video-para`   | Video section paragraph       |
| `list-font`    | Font styling for list items   |
| `check-list`   | Checkmark list styling        |

### Card Custom Classes

| Class                | Purpose                                 |
| -------------------- | --------------------------------------- |
| `card-setting`       | Card image container with custom sizing |
| `card-img-size`      | Specific card image sizing              |
| `pricing-card-body`  | Pricing card body styling               |
| `pricing-card-title` | Pricing card title styling              |

### Section-Specific Custom Classes

| Class                 | Purpose                              |
| --------------------- | ------------------------------------ |
| `Trusted-customer`    | Trusted customers section            |
| `flexitems`           | Flex container for customer logos    |
| `flexitem`            | Individual flex item (customer logo) |
| `lst-img`             | Last image in flex container         |
| `margin-bottom-custm` | Custom margin bottom spacing         |
| `text-block-padding2` | Text block with custom padding       |

### Image & Media Custom Classes

| Class            | Purpose                                 |
| ---------------- | --------------------------------------- |
| `video-img`      | Video thumbnail image styling           |
| `testmonial-img` | Testimonial image styling               |
| `team-img`       | Team member profile image               |
| `small-icons`    | Small icon sizing (social media icons)  |
| `small-icons2`   | Small icons variant 2 (contact section) |
| `icons`          | General icon styling (footer)           |

### Utility Custom Classes

| Class                  | Purpose                                       |
| ---------------------- | --------------------------------------------- |
| `text-color`           | Highlight text color (typically accent color) |
| `Testimonials-setting` | Testimonials section positioning              |

### Font Awesome Classes (Library)

| Class                        | Purpose                              |
| ---------------------------- | ------------------------------------ |
| `fontawesome-i2svg-active`   | Font Awesome SVG inline activation   |
| `fontawesome-i2svg-complete` | Font Awesome SVG processing complete |
| `svg-inline--fa`             | Font Awesome inline SVG styling      |
| `fa-facebook`                | Facebook icon                        |
| `fa-google-plus`             | Google Plus icon                     |
| `fa-square-twitter`          | Twitter (X) icon                     |
| `fa-instagram`               | Instagram icon                       |
| `fa-linkedin`                | LinkedIn icon                        |
| `fa-location-dot`            | Location/pin icon                    |
| `fa-phone`                   | Phone icon                           |
| `fa-envelope`                | Email/envelope icon                  |

---

## Summary Statistics

- **Total Bootstrap Classes Used**: ~75
- **Total Custom Classes Used**: ~50
- **Total Font Awesome Classes**: ~11

## Notes

1. The code mixes Bootstrap 5 utilities with custom CSS classes effectively
2. Some Bootstrap classes are deprecated (e.g., `text-left`, `navbar-light` has limited use in Bootstrap 5)
3. Custom classes appear to be defined in the linked `styles.css` file
4. Font Awesome 6.4.0 is being used for icons
5. The layout is responsive with mobile-first approach using Bootstrap breakpoints (md, lg, xl)
