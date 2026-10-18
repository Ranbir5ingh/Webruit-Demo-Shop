export const initiatePayment = (course) => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768;


  setTimeout(
    () => {
      window.dispatchEvent(new Event("payment-initiated"));
    },
    isMobile ? 3000 : 100
  );

  const upiLink = `upi://pay?pa=ranbirsingh.code@okicici&pn=ResumeKit%20Pro&am=${
    course.price
  }&cu=INR&tn=Payment for ${encodeURIComponent(course.title)}`;
  localStorage.setItem("payment_initiated", JSON.stringify(course));

  isMobile ? (window.location.href = upiLink) : null;
};