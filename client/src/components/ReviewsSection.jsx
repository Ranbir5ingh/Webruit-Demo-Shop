import React from "react";
import quote from "@/assets/quote.svg";

const reviews = [
  {
    name: "Ananya Sharma",
    initials:"AS",
    text: "I had been struggling with making my resume stand out, but this kit gave me exactly what I needed. The templates are modern, easy to edit, and really highlight my skills in the best way. Definitely worth it!"
  },
  {
    name: "Rohit Mehta",
    initials:"RM",
    text: "This Resume Kit is a game-changer. The structure and design are so professional that I got interview calls within a week of updating my resume. Highly recommended for anyone serious about their career."
  },
  {
    name: "Priya Verma",
    initials:"PY",
    text: "I loved how clean and elegant the templates look. They don’t feel overdesigned yet still make a strong impact. It really helped me present myself confidently."
  },
  {
    name: "Karan Patel",
    initials:"KP",
    text: "The Resume Kit made it super easy for me to customize and create a professional-looking resume. I’ve tried free templates before, but this one feels premium and much better in terms of design and clarity."
  },
  {
    name: "Simran Kaur",
    initials:"SK",
    text: "Honestly, this kit saved me so much time. Instead of worrying about formatting, I could focus on writing good content. The layout makes everything look neat and recruiter-friendly."
  },
  {
    name: "Aditya Singh",
    initials:"AS",
    text: "I wasn’t sure at first, but after using the Resume Kit, I realized how important design is. My resume finally looks polished and professional, and I’ve already noticed better responses."
  },
  {
    name: "Neha Joshi",
    initials:"NJ",
    text: "The templates are beautifully designed and easy to edit in Google Docs and Canva. It made me feel much more confident while applying for internships and jobs."
  },
  {
    name: "Vivek Rathi",
    initials:"VR",
    text: "This kit is perfect for students and job seekers. The balance between creativity and professionalism is just right. It really gave me an edge over other resumes I’ve seen."
  },
  {
    name: "Shreya Kapoor",
    initials:"SK",
    text: "Simple, elegant, and effective. The kit gave my resume a professional touch without being overwhelming. I would recommend it to anyone who wants to make a strong first impression."
  }
];


const ReviewsSection = () => {
  return (
    <section className="text-[#0a0a0a] py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-8 sm:mb-12 md:mb-16 max-w-7xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-[#0a0a0a] text-[1.9rem] xs:text-[1.3rem] sm:text-[1.6rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] font-bold leading-tight px-2 sm:px-4 font-toboggan-medium">
          Why professionals love ResumeKit Pro...
        </h2>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
        {reviews.map((review, index) => (
          <div
            key={index}
            className=" bg-gray-100 rounded-2xl p-8 sm:p-5 md:p-6 lg:p-8 flex flex-col gap-6 sm:gap-4 lg:gap-6 relative break-inside-avoid mb-6"
          >
            {/* Quote icon */}
            <img src={quote} alt="quote" className="w-8 h-8 sm:w-7 sm:h-7 md:w-8 md:h-8"/>
            
            {/* Review text */}
            <p className="font-medium text-[0.95rem] sm:text-[0.875rem] md:text-[0.95rem] lg:text-[1rem] text-black/70 leading-relaxed">
              {review.text}
            </p>

            <div className="flex items-end justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-[1.4rem] sm:text-[1.1rem] md:text-[1.25rem] font-bold">
                  <span className="bg-gradient-to-r from-indigo-500 to-indigo-400 bg-clip-text text-transparent font-toboggan-medium">
                    {review.initials}
                  </span>
                </div>
                <div className="flex flex-col">
                  {/* Name */}
                  <div className="text-[1.05rem] sm:text-[1.05rem] md:text-[1.1rem] lg:text-[1.125rem]  font-toboggan-regular">
                    {review.name}
                  </div>
                  {/* Stars */}
                  <div className="flex text-yellow-400 text-[1.1rem] sm:text-[1.05rem] md:text-[1.1rem] lg:text-[1.125rem]">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;