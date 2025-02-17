import { BadgeProps } from "@/components/ui/badge";

export interface PricingPlan {
  name: string;
  price: string | number;
  period: 'monthly' | 'annually' | 'weekly';
  badge?: {
    text: string;
    variant: BadgeProps['variant'];
  };
  features: string[];
  highlighted?: boolean;
  buttonText?: string;
  paypalPlanId?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic Boost', // Edit name
    price: 10, // Edit price
    period: 'week', // Change period: 'weekly', 'monthly', or 'annually'
    badge: { 
      text: 'Most Popular', // Edit badge text
      variant: 'default' // Change variant: 'default', 'secondary', or 'outline'
    },
    features: [ // Edit features list
      'Launch immediately',
      'Boosted listing for a week',
      'Priority support' // Add more features
    ],
    buttonText: 'Get Started', // Edit button text
    paypalPlanId: 'basic-boost' // PayPal plan ID for payments
  },
  {
    name: 'Premium Boost',
    price: 30,
    period: 'week',
    badge: { 
      text: 'Best Value',
      variant: 'secondary'
    },
    features: [
      'Launch immediately',
      'Premium listing for a week',
      'Priority placement',
      '1x Newsletter mention',
     
      
    ],
    highlighted: true,
    buttonText: 'Upgrade to Pro',
    paypalPlanId: 'pro-boost'
  },
  {
    name: 'Custom',
    price: 'Custom',
    period: 'annually',
    badge: {
      text: 'Enterprise',
      variant: 'outline'
    },
    features: [
      
      'Custom promotion plan',
      'Dedicated support',
      'Custom integrations',
    
    ],
    buttonText: 'Contact Sales'
  }
];