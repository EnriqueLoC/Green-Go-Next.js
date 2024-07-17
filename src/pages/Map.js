import Image from "next/image";
import { useScroll, useTransform, motion, color } from "framer-motion";
import { useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import Lenis from 'lenis';
import Navbar from '../components/Navbar';

const Pic2 = '/assets/bwg.jpg'; // Asegúrate de que la ruta de la imagen sea correcta
const containerStyle = {
  width: "100%",
  height: "100%"
}
const recycleCenters = [
  { id: 1, name: "Recicladora de Papel S.A. de C.V.", position: { lat: 28.652667679251763, lng: -106.06601643311855 } },
  { id: 2, name: "Fierro Viejo y Cartón", position: { lat: 28.651163955122623, lng: -106.06340708182734 } },
  { id: 3, name: "Tecnologías de Reciclado", position: { lat: 28.69310993368951, lng: -106.10049722528184 } },
  { id: 4, name: "Kalisch Recycling 1", position: { lat: 28.69491690242366, lng: -106.11835000809594 } },
  { id: 5, name: "Kalisch Recycling 2", position: { lat: 28.612909810559174, lng: -106.0886353927554 } },
  { id: 6, name: "Chatarra 1", position: { lat: 28.61897953067645, lng: -106.07839638848286 } },
  { id: 7, name: "Metales Reciclados", position: { lat: 28.61837522160605, lng: -106.0535792554501 } },
  { id: 8, name: "Kalisch Recycling 3", position: { lat: 28.615145327276956, lng: -106.02185731779988 } },
  { id: 9, name: "Chatarra 2", position: { lat: 28.596759045805445, lng: -106.02958207959446 } },
  { id: 10, name: "Reduce A.C", position: { lat: 28.609376603882655, lng: -106.00517038009228 } },
  { id: 11, name: "Charly chatarra", position: { lat: 28.60769968975533, lng: -106.00333372893131 } },
  { id: 12, name: "Comercializadora de Chatarra", position: { lat: 28.607171991951837, lng: -105.99951844252341 } },
  { id: 13, name: "RECHISA", position: { lat: 28.606933358189092, lng: -105.9992622004532 } },
  { id: 14, name: "Chatarra La Junta Sucursal Fuentes Mares", position: { lat: 28.60576538160158, lng: -105.99782453645254 } },
  { id: 15, name: "Reciclaje Romero", position: { lat: 28.605068357128907, lng: -105.99784599412419 } },
  { id: 16, name: "Recicladora Lom Moya", position: { lat: 28.606845744164094, lng: -105.9654603300531 } },
  { id: 17, name: "Reci Pet", position: { lat: 28.671043558104014, lng: -106.0645863284326 } },
  { id: 18, name: "Cajas Recicladas Chihuahua", position: { lat: 28.653754700042487, lng: -106.0150956164143 } },
  { id: 18, name: "Recilogic Planta Chihuahua", position: { lat: 28.64597261424409, lng: -106.00583801632348 } },
];

const Map = () => {

  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBTyq_04RYLMVR1tmilmddDqeSset7tbTY", // Reemplaza con tu clave de API
  });

  if (loadError) {
    return <div>Error cargando Google Maps API: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>; // Renderiza un estado de carga hasta que Google Maps se cargue
  }

  const Section1 = ({ scrollYProgress }) => {
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

    const backgroundImageStyle = {
      backgroundImage: `url(${Pic2})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };

    return (

      <motion.div style={{ scale, rotate, ...backgroundImageStyle }} className="sticky top-0 h-screen bg-[#12b735] text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh]">
        <p className="GG">Associates Locations</p>
        <div className="flex gap-4">
          <div className="relative w-[12.5vw]">
          </div>
        </div>
      </motion.div>
    );
  };

  const Section2 = ({ scrollYProgress }) => {
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

    return (
      <motion.div style={{ scale, rotate }} className="relative h-screen">
        <div className="flex items-center justify-center h-full">
          <div className="w-[80%] h-[80%] bg-gray-200 text-center flex items-center justify-center">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{ lat: 28.6674057, lng: -106.0576012 }}
              zoom={11.75}
            >
              {recycleCenters.map((center) => (
                <Marker

                  key={center.id}
                  position={center.position}
                  title={center.name}
                  icon={
                    {
                      url: "/assets/icon.png",
                      scaledSize: new window.google.maps.Size(35, 35)
                    }
                  }
                />
              ))}
            </GoogleMap>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <main ref={container} className="relative h-[200vh] bodyMap">
      <Navbar />
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
    </main>
  );
}

export default Map;
