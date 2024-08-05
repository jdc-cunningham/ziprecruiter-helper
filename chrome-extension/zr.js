// keyword variables referenced from meta.js injected on page before this one

let jobResultSidebarFilterRan = false;

const bindJobResultClick = () => {
  document.querySelectorAll('.job_result_wrapper').forEach(job => {
    job.addEventListener('click', async () => {
      setTimeout(() => {
        const jobPane = document.querySelector('div[data-testid="right-pane"]');
        const jobText = jobPane.innerText.toLowerCase();

        let matchedKeyword = '';

        const blockJob = blockedJobDetailsKeywords.some(keyword => {
          if (jobText.includes(keyword)) {
            matchedKeyword = keyword;
          };
        });

        if (blockJob || !(jobText.includes('equivalent') && jobText.includes('experience'))) {
          job.children[0].style.opacity = 0.1;
          job.innerHTML += `<div style="color: red; transform: translate(50px, -240px); font-weight: bold;">${matchedKeyword}</div>`;
        }
      }, 1000);
    });
  });
};

const filterJobResultSidebar = (sidebar) => {
  const jobs = Array.from(sidebar.children);

  jobs.forEach(job => {
    // lazy specificity but works
    const jobText = job.innerText.toLowerCase();
    const blockJob = blockedSidebarKeywords.some(keyword => jobText.includes(keyword));

    if (blockJob) {
      job.style.opacity = 0.1;
    }
  });

  // this gets reset on pagination which is a full page refresh
  jobResultSidebarFilterRan = true;
};

const getJobResultSidebar = () => document.querySelector('.job_results_two_pane');

const waitForJobResultSidebar = () => new Promise(resolve => {
  const wait = () => {
    const jp = getJobResultSidebar();

    if (jp) {
      resolve(jp);
    } else {
      setTimeout(() => {
        wait();
      }, 50);
    }
  }

  wait();
});

const bindToJobResultSidebar = (sidebar) => {
  sidebar.addEventListener('scrollend', () => {
    // I did try calling a function directly from here (no brackets) to be cleaner but doesn't run
    if (!jobResultSidebarFilterRan) filterJobResultSidebar(sidebar);
  });  
};

const listenToJobResultSidebarScroll = async () => {
  const jobResultSidebar = await waitForJobResultSidebar();
  bindToJobResultSidebar(jobResultSidebar);
  bindJobResultClick();
};

listenToJobResultSidebarScroll();
