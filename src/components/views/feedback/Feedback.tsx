export default function FeedbackView() {

  console.log(window.innerHeight)

  return (
    <div className="flex flex-col items-center h-screen justify-around">
      <div className="hero">
        <div className="hero-content">
          <h3 className="font-bold text-3xl spacing text-secondary">
            Please consider leaving feedback.
          </h3>
        </div>
      </div>
      <div className="shadow-lg shadow-accent">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfLx3JhuWjzDUUfoCF2k1kaEb3WuIxpfU8Ci53aqG5RKQs7bg/viewform?embedded=true"
          width={window.innerWidth - 260}
          height={window.innerHeight - 180}>Loading…</iframe>
      </div>
    </div>
  )
}