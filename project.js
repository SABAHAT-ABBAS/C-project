document.addEventListener('DOMContentLoaded', function() {
    const adoptButtons = document.querySelectorAll('.adopt-button');
    const taskBarLinks = document.querySelectorAll('.task-bar ul li a.task-link');
    const sections = document.querySelectorAll('.category-section');
    const petCards = document.querySelectorAll('.pet-card');

    // Function to show the selected category section
  

   

    // Show all sections initially
    showCategory('all');

    // Handle click on task bar links
    taskBarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const category = link.getAttribute('data-category');
            showCategory(category);
        });
    });

    function showCategory(category) {
    sections.forEach(section => {
        // Check if the section is "Happy Tails" or "About Us"
        if (section.id === 'happySection' ) {
            // Only show the section if the clicked category matches its data-category
            if (category === section.getAttribute('data-category')) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        } else {
            // Show or hide other sections based on the clicked category
            if (category === 'all' || section.id === category + 'Section') {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        }
    });
}



    // Handle click on adopt buttons
    adoptButtons.forEach(button => {
        button.addEventListener('click', function() {
            const petName = button.dataset.pet;
            // Check if the pet is already adopted
            if (!button.classList.contains('adopted')) {
                openAdoptionForm(petName, button);
            } else {
                alert('This pet has already been adopted!');
            }
        });
    });


   
    var slideIndex = 0;
    showSlides();

    function showSlides() {
        var i;
        var slides = document.querySelectorAll(".slideshow-container .mySlides");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        slides[slideIndex-1].style.display = "block";  
        setTimeout(showSlides, 2000); // Change image every 2 seconds
    }



    // Open adoption form modal
    function openAdoptionForm(petName, button) {
        const modal = document.getElementById('adoptionModal');
        modal.style.display = 'block';
        document.getElementById('adoptionForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            formData.append('petName', petName);
            submitAdoptionForm(formData, button); // Pass the button element
            modal.style.display = 'none'; // Hide modal after form submission
        });
        document.getElementsByClassName('close')[0].onclick = function() {
            modal.style.display = 'none';
        };
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
    }

    // Submit adoption form
    function submitAdoptionForm(formData, button) {
        // You can handle form submission here, for example, send data to server
        console.log('Form submitted!');
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ': ' + pair[1]);
        }
        // Display congratulations message
        displayCongratulationsMessage();
        // Update button text to indicate adoption
        button.innerText = 'Adopted';
        // Add a class to indicate adoption
        button.classList.add('adopted');
    }

    // Function to display congratulations message
    function displayCongratulationsMessage() {
        const message = document.createElement('div');
        message.textContent = 'Congratulations on adopting a new pet!';
        message.classList.add('congratulations-message');
        document.querySelector('main').appendChild(message);
        // Remove the message after 5 seconds
        setTimeout(function() {
            message.remove();
        }, 5000);
    }
});
