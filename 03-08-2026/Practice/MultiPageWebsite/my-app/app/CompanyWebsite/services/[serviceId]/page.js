// app/services/[serviceId]/page.js
export default async function ServiceDetail({ params }) {
  const { serviceId } = await params;
  
  const services = {
    "web-dev": { 
      name: "Web Development", 
      description: "We build amazing websites" 
    },
    "app-dev": { 
      name: "App Development", 
      description: "We create mobile apps" 
    },
  };

  const service = services[serviceId];

  return (
    <div>
      <h1>{service?.name || "Service Not Found"}</h1>
      <p>{service?.description || "This service doesn't exist"}</p>
    </div>
  );
}