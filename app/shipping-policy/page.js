export default function ShippingPolicyPage() {
  return <PolicyPage title="Shipping Policy" text="Orders are planned for 2-5 working days delivery in major Pakistan cities. Delivery charges, courier availability, and timelines can vary by city and campaign." />;
}

function PolicyPage({ title, text }) {
  return <main className="page"><section className="text-page"><p className="eyebrow">Policy</p><h1>{title}</h1><p>{text}</p></section></main>;
}
