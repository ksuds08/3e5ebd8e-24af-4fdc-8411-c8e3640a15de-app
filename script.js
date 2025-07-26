document.getElementById('resume-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const personalInfo = document.getElementById('personal-info').value;
  const jobDescription = document.getElementById('job-description').value;
  const templateStyle = document.getElementById('template-style').value;

  const response = await fetch('/functions/api/handler.ts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      personalInfo,
      jobDescription,
      templateStyle
    })
  });

  if (response.ok) {
    const resumeData = await response.json();
    // Handle the resume data, e.g., show a success message or download link
    console.log(resumeData);
    alert('Your resume has been generated successfully!');
  } else {
    alert('Failed to generate resume. Please try again later.');
  }
});
