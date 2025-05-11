import { Prospect } from '../types/types';

// Generate a set of mock prospects based on search criteria
export const generateProspects = (
  industry: string,
  companySize: string,
  contactPosition: string
): Prospect[] => {
  // Return empty array ~10% of the time to simulate no results
  if (Math.random() < 0.1) {
    return [];
  }

  // Generate between 3-6 prospects
  const count = Math.floor(Math.random() * 4) + 3;
  const prospects: Prospect[] = [];

  // Generate company names based on industry
  const companySuffixes = industry.toLowerCase().includes('saas') 
    ? ['Tech', 'Software', 'Cloud', 'Solutions', 'Systems', 'App']
    : industry.toLowerCase().includes('e-commerce') 
      ? ['Shop', 'Store', 'Market', 'Retail', 'Commerce', 'Buy']
      : ['Group', 'Inc', 'Co', 'Partners', 'Global', 'International'];

  // First names and last names for contact generation
  const firstNames = ['Ana', 'Carlos', 'María', 'Juan', 'Laura', 'Javier', 'Sofia', 'Miguel', 'Paula', 'Roberto'];
  const lastNames = ['García', 'Rodríguez', 'López', 'Martínez', 'González', 'Hernández', 'Pérez', 'Sánchez', 'Ramírez', 'Torres'];

  // Generate position titles based on the requested position
  const positionPrefix = contactPosition.toLowerCase().includes('marketing') 
    ? ['Marketing', 'Digital', 'Brand', 'Growth']
    : contactPosition.toLowerCase().includes('ventas') || contactPosition.toLowerCase().includes('sales')
      ? ['Sales', 'Business', 'Account', 'Revenue']
      : ['Senior', 'Head of', 'Lead', 'Chief'];

  const positionSuffix = contactPosition.toLowerCase().includes('marketing')
    ? ['Manager', 'Director', 'Specialist', 'Strategist']
    : contactPosition.toLowerCase().includes('ventas') || contactPosition.toLowerCase().includes('sales')
      ? ['Manager', 'Executive', 'Representative', 'Director']
      : ['Officer', 'Executive', 'Manager', 'Lead'];

  // Industry variations for tagging
  const industryVariations = industry.split(',')[0].trim().split(' ');
  const mainIndustry = industryVariations[0];
  
  // Create prospects
  for (let i = 0; i < count; i++) {
    // Generate company name
    const prefix = ['Neo', 'Digi', 'Tech', 'Smart', 'Bright', 'Next', 'Future', 'Cloud', 'Data', 'Eco'][i % 10];
    const suffix = companySuffixes[i % companySuffixes.length];
    const companyName = `${prefix}${mainIndustry.charAt(0).toUpperCase() + mainIndustry.slice(1)} ${suffix}`;
    
    // Generate contact name
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const contactName = `${firstName} ${lastName}`;
    
    // Generate position
    const prefix2 = positionPrefix[Math.floor(Math.random() * positionPrefix.length)];
    const suffix2 = positionSuffix[Math.floor(Math.random() * positionSuffix.length)];
    const position = contactPosition || `${prefix2} ${suffix2}`;
    
    // Create prospect
    prospects.push({
      id: `prospect-${i}-${Date.now()}`,
      companyName,
      industry: mainIndustry,
      website: `https://www.${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
      companySize,
      contactName,
      contactPosition: position
    });
  }

  return prospects;
};

// Generate a mock email for a prospect
export const generateEmail = (prospect: Prospect): string => {
  const { contactName, companyName, contactPosition } = prospect;
  const firstName = contactName.split(' ')[0];
  
  return `Asunto: Oportunidad de colaboración para optimizar procesos en ${companyName}

Estimado/a ${firstName},

Espero que este mensaje le encuentre bien. Mi nombre es [Tu Nombre] de [Tu Empresa], y me pongo en contacto con usted después de investigar sobre ${companyName} y su impresionante trayectoria en el sector.

Como ${contactPosition} de ${companyName}, seguramente está buscando maneras de optimizar los procesos comerciales y mejorar los resultados. Nuestra solución ha ayudado a empresas similares a incrementar su eficiencia en prospección en un 40% y a mejorar sus tasas de conversión.

¿Tendría disponibilidad para una breve llamada de 15 minutos la próxima semana para comentarle cómo podríamos ayudarles específicamente a ${companyName}?

Quedo a la espera de su respuesta y le agradezco de antemano su tiempo.

Saludos cordiales,

[Tu Nombre]
[Tu Cargo]
[Tu Empresa]
[Tu Teléfono]
[Tu Email]`;
};