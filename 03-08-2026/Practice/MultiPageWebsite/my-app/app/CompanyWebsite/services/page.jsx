// app/services/page.js
import Link from "next/link";

export default function Services() {
  const services = [
    { id: "web-dev", name: "Web Development" },
    { id: "app-dev", name: "App Development" },
    { id: "consulting", name: "Consulting" },
  ];

  return (
    <div>
      <h1>Our Services</h1>
      {services.map(service => (
        <Link href={`/services/${service.id}`} key={service.id}>
          {service.name}
        </Link>
      ))}
    </div>
  );
}