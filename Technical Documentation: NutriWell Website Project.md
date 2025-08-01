# Technical Documentation: NutriWell Website Project

## 1. Introduction

This document provides comprehensive technical documentation for the NutriWell website project. It is intended for developers, particularly AI agents like Claude Code and Cursor Agent, who will be continuing the development and implementation of new features, specifically the personalized nutrition plan functionalities (Free and Paid versions). The goal is to provide a clear understanding of the current website architecture, existing code structure, and detailed specifications for the upcoming features, ensuring a smooth transition and efficient development process.

## 2. Current Website Architecture and Code Structure

## 3. Personalized Nutrition Plan Features (Free and Paid Versions)

## 4. Development Guidelines for Claude Code and Cursor Agent

## 5. Conclusion and Next Steps

## 6. References



### 2.1. Technology Stack

The NutriWell website is a single-page application (SPA) built using the following core technologies:

*   **Frontend Framework**: React.js (version 18.2.0, as per `package.json` in `nutriwell-original` project)
*   **Build Tool**: Vite (version 6.3.5, as per `package.json`)
*   **Styling**: Tailwind CSS (version 3.4.4, as per `package.json`) for utility-first CSS, providing a highly customizable and efficient styling approach. The `App.css` file contains custom styles and imports for Tailwind.
*   **UI Components**: Shadcn/ui (version 0.8.0, as per `package.json`) for pre-built, accessible, and customizable UI components like Buttons, Cards, etc.
*   **Icons**: Lucide React (version 0.395.0, as per `package.json`) for a comprehensive set of open-source icons.
*   **State Management**: React's built-in `useState` and `useEffect` hooks are used for local component state management and side effects, respectively. There is no global state management library (e.g., Redux, Zustand) currently implemented.
*   **Routing**: Client-side routing is handled by simple anchor tags (`<a>`) for internal page navigation (e.g., `#home`, `#about`, `#services`, `#contact`). There is no dedicated routing library (e.g., React Router DOM) in use.

### 2.2. Project Structure

The project resides in the `/home/ubuntu/nutrition_website/nutriwell-original` directory and follows a standard React application structure generated by `manus-create-react-app`:

```
nutriwell-original/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/  # Static assets like images (e.g., hero_fruits_vegetables.jpg, nutrition_consultation.jpg)
│   ├── components/
│   │   └── ui/  # UI components from shadcn/ui (e.g., button.jsx, card.jsx)
│   ├── App.css  # Global and custom CSS styles, including Tailwind imports
│   ├── App.jsx  # Main application component, containing all page sections and logic
│   ├── index.css  # Base CSS for the application
│   └── main.jsx  # Entry point for the React application
├── index.html  # Main HTML file, serving as the entry point for the web browser
├── package.json  # Project metadata and dependencies
├── pnpm-lock.yaml  # Lock file for dependencies (generated by pnpm)
├── vite.config.js  # Vite bundler configuration
└── ... (other configuration files)
```

### 2.3. Core Components and Their Interactions

The primary component of the application is `App.jsx`. This file encapsulates the entire website's content and logic, including:

*   **Navigation (`<nav>` tag)**: Contains links to different sections of the page (`#home`, `#about`, `#services`, `#contact`). It uses basic HTML anchor tags for smooth scrolling to respective sections.
*   **Hero Section (`#home`)**: The initial view of the website, featuring a main heading, a descriptive paragraph, and call-to-action buttons. It utilizes `heroImage` from `src/assets`.
*   **Features Section**: Highlights the benefits of NutriWell services using `Card` components from `shadcn/ui` and `Lucide React` icons.
*   **About Section (`#about`)**: Provides information about Diego Deras, including qualifications and a call-to-action button. It displays `consultationImage`.
*   **Services Section (`#services`)**: Details the nutrition services offered, such as Individual Consultations, Meal Planning, and Group Workshops. Each service is presented using `Card` components. The images `healthyPlateImage` and `lifestyleImage` are used within the cards for Individual Consultations and Meal Planning, respectively.
*   **Resources Section**: Offers free resources like a Healthy Eating Guide and a 7-Day Meal Prep Guide. Each resource is presented with a `Card` component and a download button. The images `healthyPlateImage` and `lifestyleImage` are used within the cards for Healthy Eating Guide and 7-Day Meal Prep Guide, respectively.
*   **CTA Section**: A prominent call-to-action section encouraging users to schedule a consultation.
*   **Contact Section (`#contact`)**: Includes a contact form for user inquiries and displays contact information placeholders (Phone, Email, Location) and office hours. Form state is managed using `useState`.
*   **Footer (`<footer>`)**: Contains quick links, service categories, and copyright information.
*   **Onboarding Modal**: A `useState`-managed modal that appears on the first visit (controlled by `localStorage`) to guide new users. It includes a call-to-action for a quiz or to explore the site.

All styling is primarily handled by Tailwind CSS classes applied directly to JSX elements, with some custom styles defined in `App.css`. The `index.html` file serves as the entry point, loading the React application through `main.jsx`.



### 3.1. Free Version: Personalized One-Day Meal Plan

**Description:** The free version of the personalized nutrition plan aims to provide users with a basic, one-day meal plan. This plan will be generated based on fundamental user inputs such as age, weight, height, and dietary preferences (e.g., vegetarian, gluten-free). The primary goal is to offer a simple, evidence-based introduction to healthy eating, aligning with widely recognized nutritional guidelines such as Health Canada’s Food Guide [1] or USDA MyPlate recommendations [2]. This feature serves as a valuable lead magnet, encouraging user engagement and demonstrating the website's utility without requiring a financial commitment.

**Implementation Details:**

*   **Data Source:** The core of the free version's meal plan generation will rely on the USDA FoodData Central database [3]. For this version, a curated subset of approximately 100 common foods and their associated basic nutrient information will be utilized. This limited dataset ensures quick processing and reduces the complexity of the initial implementation.

*   **User Input Form:** A simple, 5-question form will be developed to collect essential user data. This form will capture:
    1.  Age
    2.  Weight
    3.  Height
    4.  Gender (for basic caloric estimation)
    5.  Dietary Preferences (e.g., vegetarian, vegan, gluten-free, dairy-free, no nuts, etc. - multiple selections possible).

*   **Algorithm (Frontend/Backend):** A straightforward algorithm will be implemented to match user inputs to MyPlate’s portion guidelines or Health Canada’s serving suggestions. This algorithm will primarily focus on:
    *   **Categorization:** Grouping foods from the 100-item dataset into MyPlate/Food Guide categories (fruits, vegetables, grains, protein foods, dairy/alternatives).
    *   **Basic Portioning:** Assigning standard serving sizes for each category based on general caloric needs derived from age, weight, height, and gender (e.g., a simple BMR calculation). This will be a simplified estimation, not a precise caloric breakdown.
    *   **Dietary Filtering:** Filtering out foods that do not align with the user's specified dietary preferences.
    *   **Meal Assembly:** Constructing a sample one-day meal plan (e.g., Breakfast, Lunch, Dinner, 1-2 Snacks) by selecting appropriate foods from the filtered dataset and assigning approximate portion sizes.

*   **Hosting:** The algorithm logic, if it requires server-side processing beyond simple client-side JavaScript, can be hosted on a free server platform like Heroku [4]. This would involve a lightweight backend (e.g., a Python Flask or Node.js Express application) to handle form submissions, process data, and return the generated meal plan to the frontend. Alternatively, for maximum simplicity, initial iterations could attempt to keep the algorithm entirely client-side if feasible with the limited dataset and basic logic.

**User Benefit:** The primary benefit for the user is receiving a quick, accessible, and evidence-based meal plan without any cost. This encourages healthy eating habits, provides a tangible output, and serves as a demonstration of the website's capabilities, potentially converting free users into paid subscribers.

### 3.2. Paid Version: Detailed 7-Day Personalized Meal Plan

**Description:** The paid version offers a significantly more detailed and highly tailored 7-day meal plan. This plan goes beyond basic demographics, incorporating specific health goals (e.g., weight loss, muscle gain, maintenance), activity levels (sedentary, moderately active, active), and even medical conditions (e.g., diabetes, hypertension, high cholesterol). The recommendations will be more granular, including precise portion sizes and comprehensive nutrient breakdowns (macronutrients and key micronutrients). This version aims to provide science-backed, actionable plans for diverse and complex dietary needs, fostering deeper user engagement and delivering substantial value.

**Implementation Details:**

*   **Expanded Data Source:** The USDA FoodData Central dataset will be expanded to include 300+ foods. Crucially, this expanded dataset will be cross-referenced with additional authoritative sources like the Harvard T.H. Chan School of Public Health’s Nutrition Source [5] for more nuanced nutrient optimization and specific dietary considerations related to health conditions. This cross-referencing will ensure accuracy and depth in nutrient profiles.

*   **User Input Form:** A more extensive, 15-question form will be developed to gather detailed user information. This form will include all inputs from the free version, plus:
    *   Specific Health Goals (e.g., weight loss, muscle gain, weight maintenance, improved energy, managing specific conditions).
    *   Activity Level (e.g., sedentary, light, moderate, very active).
    *   Medical Conditions (e.g., Type 2 Diabetes, Hypertension, Celiac Disease, IBS, high cholesterol - with appropriate disclaimers about not replacing medical advice).
    *   Food Allergies/Intolerances (more granular than general preferences).
    *   Preferred Meal Frequency (e.g., 3 meals, 3 meals + 2 snacks).
    *   Cooking Skill Level (e.g., beginner, intermediate, advanced - to suggest appropriate recipes).
    *   Time Available for Meal Prep.

*   **Custom Algorithm (Python/Pandas):** A robust custom algorithm will be built, preferably using Python with the Pandas library [6] for data manipulation and analysis. This algorithm will be significantly more complex than the free version's, incorporating:
    *   **Precise Caloric and Macronutrient Calculation:** Based on detailed user inputs (age, weight, height, gender, activity level, health goals), the algorithm will calculate precise daily caloric and macronutrient (protein, carbohydrates, fats) targets.
    *   **Micronutrient Optimization:** The algorithm will aim to ensure adequate intake of key vitamins and minerals, drawing from the expanded food dataset and nutritional guidelines.
    *   **Conditional Logic for Medical Conditions:** Specific rules will be implemented to adjust meal plans based on declared medical conditions (e.g., lower carbohydrate options for diabetes, lower sodium for hypertension). This will require careful mapping of food properties to health recommendations.
    *   **Recipe Integration:** The system will need to suggest actual recipes from a database (or generate simple ones) that fit the dietary requirements and nutrient targets, including portion sizes for each component of the meal.
    *   **User Feedback Loops:** Mechanisms for users to provide feedback on generated plans (e.g., 


likes/dislikes, ingredient swaps, difficulty) will be integrated. This feedback will be used to refine future plan generations for that specific user, employing a basic machine learning approach (e.g., collaborative filtering or simple preference learning) to improve personalization over time.

*   **Hosting:** The Python/Pandas backend for the custom algorithm will require a more robust hosting solution than Heroku's free tier, especially if it involves significant computation or persistent data storage. Options include dedicated virtual private servers (VPS), cloud platforms like AWS EC2, Google Cloud Run, or Azure App Service. The choice will depend on scalability needs and budget.

**User Benefit:** The paid version provides highly tailored, science-backed meal plans that directly address individual health goals and dietary restrictions. This level of personalization significantly increases user engagement, improves health outcomes, and positions NutriWell as a premium, trustworthy resource for nutrition guidance. The feedback loop ensures the plans continuously adapt to user preferences, enhancing satisfaction and retention.





### 4.1. General Development Principles

When contributing to the NutriWell project, Claude Code and Cursor Agent should adhere to the following general development principles:

*   **Modularity and Reusability:** Design and implement components and functions with modularity in mind. Aim for reusable code that can be easily integrated into different parts of the application or extended for future features. Avoid monolithic code blocks.
*   **Clean Code Practices:** Write clean, readable, and well-commented code. Follow established coding conventions (e.g., React best practices, Python PEP 8). Prioritize clarity and maintainability.
*   **Test-Driven Development (TDD) / Unit Testing:** Where applicable, consider implementing unit tests for new features or significant changes. This ensures code reliability and helps prevent regressions. While not strictly enforced for every minor change, critical components (especially the meal plan generation algorithms) should have robust test coverage.
*   **Performance Optimization:** Be mindful of performance, especially for frontend rendering and backend algorithm execution. Optimize for speed and efficiency, particularly when dealing with data processing or complex calculations. Leverage browser developer tools for profiling and identifying bottlenecks.
*   **Security Considerations:** Implement features with security in mind. For backend components, ensure proper input validation, secure API endpoints, and protection against common vulnerabilities (e.g., SQL injection, XSS). For frontend, be aware of potential client-side vulnerabilities.
*   **Scalability:** Design solutions that can scale. While initial implementations might be simple, consider how they would perform with a larger user base or expanded datasets. This applies particularly to the backend algorithm and data storage.
*   **Error Handling and Logging:** Implement comprehensive error handling mechanisms in both frontend and backend. Provide informative error messages to users and robust logging for debugging and monitoring purposes.

### 4.2. Frontend Development Guidelines (React.js)

For frontend development, specifically within the `nutriwell-original` React project, Claude Code and Cursor Agent should follow these guidelines:

*   **Component-Based Architecture:** Continue to leverage React's component-based architecture. Break down complex UI elements into smaller, reusable components. Each component should ideally have a single responsibility.
*   **State Management:** Utilize React's `useState` and `useEffect` hooks for managing local component state. For any shared state that might emerge across multiple components (e.g., user authentication status, global settings), consider proposing a suitable context API or a lightweight state management solution if the complexity warrants it.
*   **Styling with Tailwind CSS:** Continue to use Tailwind CSS for styling. Prioritize utility classes for common styles. For more complex or custom styles, define them in `App.css` and ensure they are well-organized and documented. Avoid inline styles unless absolutely necessary for dynamic values.
*   **Accessibility (A11y):** Maintain and improve accessibility. Ensure all interactive elements are keyboard navigable, provide meaningful `alt` text for images, and maintain sufficient color contrast. Use semantic HTML elements where appropriate. Refer to WCAG 2.1 guidelines [7].
*   **Responsiveness:** Ensure all new UI elements and features are fully responsive and adapt gracefully to different screen sizes (mobile, tablet, desktop). Test thoroughly using browser developer tools and Manus's preview features.
*   **Form Handling:** For new forms (e.g., the 5-question and 15-question forms for nutrition plans), implement controlled components using React state. Ensure proper input validation on the client-side before submission.
*   **API Integration:** When integrating with backend APIs (for meal plan generation), use standard JavaScript `fetch` API or a library like `axios`. Handle asynchronous operations gracefully, showing loading states and error messages to the user.

### 4.3. Backend Development Guidelines (Python/Pandas)

For the backend development, particularly for the nutrition plan generation algorithms, the following guidelines apply:

*   **Python Environment:** Develop within a Python 3.x environment. Utilize `pip` or `pnpm` for dependency management. Ensure all required libraries (e.g., Pandas, Flask/FastAPI if a web framework is used) are specified in a `requirements.txt` or `pyproject.toml` file.
*   **Data Processing with Pandas:** Leverage the Pandas library for efficient data manipulation, analysis, and transformation of the food datasets (USDA FoodData Central, Harvard Nutrition Source). Pandas DataFrames are ideal for handling structured nutritional data.
*   **Algorithm Design:** Design the meal plan generation algorithms to be modular and configurable. Separate the core logic from data loading and output formatting. This allows for easier testing and future modifications.
*   **API Design:** If a web API is implemented for the backend, design RESTful endpoints. Use clear and consistent naming conventions for endpoints and data structures. Implement proper request validation and response formatting.
*   **Database Interaction (Future):** If a database is introduced for user profiles, preferences, or a larger recipe database, use an appropriate ORM (Object-Relational Mapper) like SQLAlchemy for Python. Ensure secure database connections and prevent SQL injection vulnerabilities.
*   **Error Handling:** Implement robust error handling within the backend logic. Catch exceptions, log errors, and return meaningful error responses to the frontend.
*   **Scalability Considerations:** For the paid version's more complex algorithm, consider the computational resources required. Optimize Pandas operations for large datasets. If the algorithm becomes computationally intensive, explore options like asynchronous processing or caching.

### 4.4. Collaboration and Workflow

Claude Code and Cursor Agent should integrate seamlessly into the development workflow:

*   **Version Control:** Assume the project is managed with Git. Before making changes, pull the latest code. Create new branches for significant features or bug fixes. Commit changes frequently with clear, descriptive commit messages. (Note: Manus currently handles Git operations internally, but this principle guides the logical flow of work).
*   **Task Breakdown:** Break down complex tasks into smaller, manageable sub-tasks. This allows for iterative development and easier review.
*   **Communication:** If there are ambiguities in requirements or technical challenges, communicate them clearly. Provide detailed explanations of proposed solutions or encountered issues.
*   **Testing:** After implementing a feature, perform thorough testing to ensure it functions as expected and does not introduce regressions. Provide clear steps to reproduce and verify the functionality.
*   **Documentation Updates:** Keep this technical documentation updated. If new architectural decisions are made, new libraries are introduced, or significant changes occur in the code structure, update the relevant sections accordingly.

### 4.5. Tools and Environment

*   **Sandbox Environment:** Development will occur within the provided sandboxed virtual machine environment. This environment includes a Linux operating system, Python 3.11, Node.js 20.18.0, and various pre-installed packages and utilities.
*   **Shell Access:** Utilize the `shell_exec` tool for executing commands, managing files, and running development servers.
*   **File System Access:** Use `file_read`, `file_write_text`, `file_append_text`, and `file_replace_text` for interacting with project files.
*   **Browser Tools:** Use `browser_navigate`, `browser_view`, `browser_click`, `browser_input`, etc., for testing the frontend application and verifying UI/UX.
*   **Deployment Tools:** Use `service_deploy_frontend` for deploying the React application to a public URL for testing and user review.
*   **Search Tools:** Utilize `info_search_web` for researching external libraries, best practices, or specific technical solutions.

**Example Workflow for Implementing a New Feature:**

1.  **Understand Requirements:** Read the feature description carefully (e.g., Free Version meal plan). Identify inputs, outputs, and core logic.
2.  **Plan Implementation:** Determine which files need modification, what new components or functions are required, and how data will flow.
3.  **Code Implementation:** Write the necessary React components, update `App.jsx`, and implement backend logic (if any) using Python/Pandas.
4.  **Local Testing:** Run the development server (`npm run dev --host`) and test the feature thoroughly in the browser. Check for functionality, responsiveness, and visual correctness.
5.  **Build and Deploy:** Once satisfied with local testing, build the application for production (`npm run build`) and deploy it using `service_deploy_frontend`.
6.  **Verification:** Access the deployed URL and perform final verification of the feature in the live environment.
7.  **Document:** Update this technical documentation with details of the new feature, any new dependencies, or changes to the architecture.





## 5. Conclusion and Next Steps

This technical documentation provides a foundational understanding of the NutriWell website project, its current architecture, and detailed specifications for the upcoming Free and Paid Personalized Nutrition Plan features. It also outlines clear development guidelines for Claude Code and Cursor Agent to ensure a consistent, efficient, and high-quality development process.

The immediate next steps for this project involve the implementation of the Free Version of the Personalized Nutrition Plan, followed by the more complex Paid Version. Developers should refer to Section 3 for detailed feature specifications and Section 4 for implementation guidelines.

## 6. References

[1] Health Canada’s Food Guide: [https://food-guide.canada.ca/en/](https://food-guide.canada.ca/en/)
[2] USDA MyPlate: [https://www.myplate.gov/](https://www.myplate.gov/)
[3] USDA FoodData Central: [https://fdc.nal.usda.gov/](https://fdc.nal.usda.gov/)
[4] Heroku: [https://www.heroku.com/](https://www.heroku.com/)
[5] Harvard T.H. Chan School of Public Health’s Nutrition Source: [https://www.hsph.harvard.edu/nutritionsource/](https://www.hsph.harvard.edu/nutritionsource/)
[6] Pandas: [https://pandas.pydata.org/](https://pandas.pydata.org/)
[7] Web Content Accessibility Guidelines (WCAG) 2.1: [https://www.w3.org/TR/WCAG21/](https://www.w3.org/TR/WCAG21/)


