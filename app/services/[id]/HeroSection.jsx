import services from '@/data/services';

export default function HeroSection({params}) {
  const service = services.find((service) => service.id === params.id);

  return(
    <section className="relative w-full h-[350px] sm:h-[450px] flex items-center justify-center mb-12">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg mb-4">{service.title}</h1>
          <p className="text-lg sm:text-2xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow">{service.description}</p>
        </div>
      </section>
  )
}