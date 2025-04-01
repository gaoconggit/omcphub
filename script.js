// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a, .hero a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links that start with #
            const href = this.getAttribute('href');
            if(href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust for header height
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    document.querySelectorAll('header nav a').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    
                    if(this.parentElement && this.parentElement.tagName === 'LI') {
                        this.classList.add('active');
                    }
                    
                    // Close mobile menu if open
                    const nav = document.querySelector('header nav');
                    if(nav.classList.contains('active')) {
                        nav.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-btn');
    mobileMenuButton.innerHTML = '☰';
    
    const headerContainer = document.querySelector('header .container');
    const nav = document.querySelector('header nav');
    
    if(headerContainer && nav) {
        headerContainer.appendChild(mobileMenuButton);
        
        mobileMenuButton.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Change button text between hamburger and X
            if(nav.classList.contains('active')) {
                mobileMenuButton.innerHTML = '✕';
            } else {
                mobileMenuButton.innerHTML = '☰';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if(nav.classList.contains('active') && 
               !nav.contains(e.target) && 
               e.target !== mobileMenuButton) {
                nav.classList.remove('active');
                mobileMenuButton.innerHTML = '☰';
            }
        });
    }
    
    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if(!name || !email || !message) {
                alert('请填写所有字段');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)) {
                alert('请输入有效的邮箱地址');
                return;
            }
            
            // In a real application, you would send this data to your server
            // For now, just show a success message
            alert('留言已发送！我们将尽快回复您。');
            contactForm.reset();
        });
    }
    
    // Make header sticky on scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if(scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down, hide header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up, show header
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}); 