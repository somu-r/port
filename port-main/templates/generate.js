document.addEventListener('DOMContentLoaded', () => {
    const educationSection = document.getElementById('educationSection');
    const addEducationButton = document.getElementById('addEducation');
    let educationCount = 1; // Start with 1 as there's already one default education item

    addEducationButton.addEventListener('click', () => {
        const newEducationItem = document.createElement('div');
        newEducationItem.classList.add('education-item');
        newEducationItem.innerHTML = `
            <div class="form-group">
                <label for="degree${educationCount + 1}">Degree/Major:</label>
                <input type="text" class="degree" name="education[${educationCount}][degree]" placeholder="e.g., B.Tech in Computer Science">
            </div>
            <div class="form-group">
                <label for="institution${educationCount + 1}">Institution:</label>
                <input type="text" class="institution" name="education[${educationCount}][institution]" placeholder="e.g., Your University Name">
            </div>
            <div class="form-group">
                <label for="graduationYear${educationCount + 1}">Graduation Year:</label>
                <input type="number" class="graduation-year" name="education[${educationCount}][year]" placeholder="e.g., 2026">
            </div>
            <div class="form-group">
                <label for="eduDescription${educationCount + 1}">Description (Optional):</label>
                <textarea class="edu-description" name="education[${educationCount}][description]" rows="2" placeholder="Relevant coursework, achievements, GPA."></textarea>
            </div>
            <button type="button" class="btn btn-secondary remove-item-btn">Remove</button>
        `;
        educationSection.appendChild(newEducationItem);
        educationCount++;
    });

    educationSection.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item-btn')) {
            event.target.closest('.education-item').remove();
        }
    });

    const projectsSection = document.getElementById('projectsSection');
    const addProjectButton = document.getElementById('addProject');
    let projectCount = 1; // Start with 1 as there's already one default project item

    addProjectButton.addEventListener('click', () => {
        const newProjectItem = document.createElement('div');
        newProjectItem.classList.add('project-item');
        newProjectItem.innerHTML = `
            <div class="form-group">
                <label for="projectName${projectCount + 1}">Project Name:</label>
                <input type="text" class="project-name" name="projects[${projectCount}][name]">
            </div>
            <div class="form-group">
                <label for="projectLink${projectCount + 1}">Project Link (Optional):</label>
                <input type="url" class="project-link" name="projects[${projectCount}][link]" placeholder="https://yourproject.com">
            </div>
            <div class="form-group">
                <label for="projectDescription${projectCount + 1}">Project Description:</label>
                <textarea class="project-description" name="projects[${projectCount}][description]" rows="3" placeholder="Briefly describe your project, your role, and technologies used."></textarea>
            </div>
            <button type="button" class="btn btn-secondary remove-item-btn">Remove</button>
        `;
        projectsSection.appendChild(newProjectItem);
        projectCount++;
    });

    projectsSection.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item-btn')) {
            event.target.closest('.project-item').remove();
        }
    });

    // Form submission (client-side simulation)
    const portfolioForm = document.getElementById('portfolioForm');
    portfolioForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(portfolioForm);
        const data = {};
        for (let [key, value] of formData.entries()) {
            // Handle array-like names for education and projects
            const match = key.match(/^(\w+)\[(\d+)\]\[(\w+)\]$/);
            if (match) {
                const [, section, index, field] = match;
                if (!data[section]) {
                    data[section] = [];
                }
                if (!data[section][index]) {
                    data[section][index] = {};
                }
                data[section][index][field] = value;
            } else {
                data[key] = value;
            }
        }

        console.log("Form Data:", data);

        // In a real application, you would send this 'data' to your backend server
        // using fetch() or XMLHttpRequest.
        // For demonstration, we'll just store it in sessionStorage and redirect to preview.
        sessionStorage.setItem('portfolioData', JSON.stringify(data));
        window.location.href = 'preview.html';
    });
});