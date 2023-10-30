export default function FeedbackView() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content bg-base-300 text-left h-full">
        <div className="max-w-xl  text-base-content p-6 rounded">

          <h1 className="text-5xl font-bold pb-1">About us:</h1>

          <a className="link link-info mx-2" href="https://www.linkedin.com/in/conwaycj/" target="_blank">
            Chris
          </a>
          &
          <a className="link link-info mx-2" href="https://www.linkedin.com/in/brycerpinkerton/" target="_blank">
            Bryce
          </a>

          <p className="py-3">
            We are a couple of bootcamp graduates passionate about software development who wanted to make the job search a little bit easier for other job seekers.
          </p>
          <p className="py-3">
            We made this app as a portfolio project to get "real jobs" but realized there's a need for making the job search maintainable when you're applying to a large number of applications at a time.
          </p>
          <p className="py-3">
            If this has made your life easier, consider leaving some feedback so we can make the app better!
          </p>
          <p className="py-3">
            This app is completely free, but if you want to support us feel free to use the <a className="link link-hover link-accent">kofi</a> button to donate. All proceeds will be going to developing a "2.0" version.
          </p>
          <div className="flex w-full">
            <a className="link link-hover btn btn-success" href="https://forms.gle/oLGfsoSFg95rLjrG9" target="_blank">
              Leave Feedback
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}