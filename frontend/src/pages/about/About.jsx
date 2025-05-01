import React, { useState, useEffect } from 'react';

const About = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    intro: false,
    collection: false,
    mission: false,
    team: false
  });
  
  // Animation observer setup
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = ['hero', 'intro', 'collection', 'mission', 'team'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });
    
    // Trigger hero animation immediately
    setIsVisible(prev => ({ ...prev, hero: true }));
    
    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, []);
  
  const categories = [
    {
      title: "Literature & Fiction",
      description: "From timeless classics to contemporary bestsellers, dive into worlds of imagination, emotion, and human experience through novels, short stories, poetry, and more.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      )
    },
    {
      title: "Non-Fiction & Biographies",
      description: "Expand your understanding of the world through carefully selected works spanning history, science, philosophy, memoirs, and the lived experiences of remarkable individuals.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Children & Teens",
      description: "Nurture young minds with age-appropriate books that entertain, educate, and inspire—from picture books for the youngest readers to compelling young adult fiction.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      )
    },
    {
      title: "Education & Reference",
      description: "Support your learning journey with textbooks, study guides, language resources, and reference materials across academic disciplines and practical skills.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      )
    },
    {
      title: "Lifestyle & Wellness",
      description: "Discover resources for personal growth, physical and mental wellbeing, cooking, home management, relationships, and finding balance in our busy modern world.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Art, Culture & Society",
      description: "Explore the rich tapestry of human creativity and social dynamics through books on visual arts, music, film, cultural studies, politics, and contemporary issues.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  const teamMembers = [
    {
      name: "Asmit",
      role: "Frontend Developer",
      description: "Crafting the interactive elements and responsive design that make browsing Book Hive a pleasure across all devices."
    },
    {
      name: "Ayush",
      role: "Backend Developer",
      description: "Building the robust infrastructure that powers our catalog, user accounts, and seamless purchasing process."
    },
    {
      name: "Nikhil",
      role: "UI/UX Designer",
      description: "Ensuring that every interaction with Book Hive is intuitive, accessible, and visually engaging for all users."
    },
    {
      name: "Rajat",
      role: "Content & Categorization Lead",
      description: "Curating our book collection and developing the organizational system that helps you find exactly what you're looking for."
    },
    {
      name: "Rohit",
      role: "Project Coordinator",
      description: "Overseeing the development process and ensuring that Book Hive continues to evolve to meet readers' needs."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section id="hero" className="relative py-20 px-4 bg-amber-700 text-white overflow-hidden">
        <div className={`max-w-4xl mx-auto relative z-10 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className={`absolute transform rotate-12 -left-10 -top-10 w-32 h-32 bg-white rounded-lg transition-transform duration-1500 ${isVisible.hero ? 'translate-x-0' : '-translate-x-32'}`}></div>
            <div className={`absolute transform rotate-45 right-20 top-40 w-20 h-20 bg-white rounded-lg transition-transform duration-1500 delay-300 ${isVisible.hero ? 'translate-x-0' : 'translate-x-32'}`}></div>
            <div className={`absolute transform -rotate-12 left-1/3 bottom-5 w-24 h-24 bg-white rounded-lg transition-transform duration-1500 delay-500 ${isVisible.hero ? 'translate-y-0' : 'translate-y-24'}`}></div>
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">About Book Hive</h1>
          <p className="text-xl mb-6 max-w-2xl">
            Welcome to Book Hive, a student-built online bookstore created with readers in mind. Born from our shared passion for literature and technology, Book Hive aims to make book discovery and purchasing simple, enjoyable, and accessible to everyone.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Introduction */}
        <section id="intro" className="mb-16">
          <div className={`bg-white p-8 rounded-lg shadow-lg transform -mt-20 relative z-20 transition-all duration-700 ${isVisible.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-lg mb-4">
              Unlike traditional resale platforms or marketplaces, Book Hive offers a carefully curated collection of books that you can purchase directly through our platform. We've eliminated the uncertainty of third-party sellers to provide you with a seamless, trustworthy shopping experience from browse to delivery.
            </p>
            <p className="text-lg mb-4">
              Built with modern technologies like <span className="text-amber-700 font-semibold">React</span>, our website ensures a smooth and fast user experience across all your devices. Whether you're browsing on a laptop during lunch break or making a purchase from your phone on the commute home, Book Hive adapts to your needs with responsive design and intuitive navigation.
            </p>
          </div>
        </section>

        {/* Our Collection */}
        <section id="collection" className="mb-16">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible.collection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="inline-block text-3xl font-bold relative pb-2 text-amber-700">
              Our Collection
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-amber-400 transition-all duration-700 ${isVisible.collection ? 'w-24' : 'w-0'}`}></span>
            </h2>
            <p className="text-lg mt-6 max-w-2xl mx-auto">
              We've organized our growing library into six thoughtfully curated categories to help you find exactly what you're looking for—or discover something entirely new:
            </p>
          </div>

          <div className={`mb-8 transition-all duration-700 delay-200 ${isVisible.collection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex overflow-x-auto pb-2 hide-scrollbar space-x-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-3 rounded-lg whitespace-nowrap flex-shrink-0 transition-all duration-300 ${
                    activeCategory === index 
                      ? 'bg-amber-700 text-white shadow-md scale-105' 
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200 hover:scale-105'
                  }`}
                  onClick={() => setActiveCategory(index)}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          <div className={`bg-white rounded-lg shadow-md p-8 transition-all duration-500 ${isVisible.collection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-start">
              <div className={`mr-6 text-amber-600 transition-all duration-300 ${activeCategory !== null ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                {categories[activeCategory].icon}
              </div>
              <div className="transition-opacity duration-300">
                <h3 className="text-2xl font-semibold mb-3">{categories[activeCategory].title}</h3>
                <p className="text-lg text-gray-700">{categories[activeCategory].description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section id="mission" className="mb-16">
          <div className={`flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-700 ${isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="md:w-1/3 bg-amber-700 text-white p-8 flex items-center justify-center">
              <h2 className={`text-3xl font-bold transition-all duration-700 delay-300 ${isVisible.mission ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>Our Mission</h2>
            </div>
            <div className="md:w-2/3 p-8">
              <p className={`text-lg mb-4 transition-all duration-700 delay-400 ${isVisible.mission ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                At Book Hive, we believe in the transformative power of reading. Our mission is to connect readers with books that inform, entertain, challenge, and inspire. We're committed to creating an online bookstore that combines the convenience of digital shopping with the thoughtful curation of a neighborhood bookshop.
              </p>
              <p className={`text-lg transition-all duration-700 delay-500 ${isVisible.mission ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                As students ourselves, we understand the importance of accessible knowledge and the joy of getting lost in a good book. That's why we've designed Book Hive to be not just a store, but a community where book lovers can discover their next favorite read with confidence and ease.
              </p>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section id="team">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="inline-block text-3xl font-bold relative pb-2 text-amber-700">
              Meet Our Team
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-amber-400 transition-all duration-700 ${isVisible.team ? 'w-24' : 'w-0'}`}></span>
            </h2>
            <p className="text-lg mt-6 max-w-2xl mx-auto">
              Book Hive is proudly created and maintained by a dedicated team of student developers and book enthusiasts:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className={`bg-white p-6 rounded-lg shadow-md border-t-4 border-amber-500 hover:shadow-lg transition-all duration-500 hover:translate-y-1 hover:border-amber-600 ${isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-700 font-bold text-xl transition-all duration-300 hover:scale-110 hover:bg-amber-200">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-amber-700 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>

          <div className={`mt-12 text-center transition-all duration-700 delay-700 ${isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-lg">
              We're constantly working to improve Book Hive and expand our collection. Have questions, feedback, or suggestions? We'd love to hear from you through our Contact page.
            </p>
            <p className="text-lg mt-4">
              Happy reading!
            </p>
            <p className="text-xl font-semibold mt-4 text-amber-700">
              — The Book Hive Team
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;