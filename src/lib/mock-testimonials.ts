export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  message: string;
  rating: number;
  result: string;
}

export const testimonials: Testimonial[] = [];
