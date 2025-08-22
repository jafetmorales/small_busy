export default function Pricing() {
  const tiers = [
    { name: 'Starter', price: '$29', desc: '1 location • 5 competitors • weekly alerts', cta: 'Start Trial' },
    { name: 'Growth', price: '$79', desc: '3 locations • 15 competitors • daily critical changes', cta: 'Upgrade' },
    { name: 'Pro', price: '$179', desc: '10 locations • 50 competitors • webhooks & benchmarks', cta: 'Contact' },
  ];
  return (
    <div className="container mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">Pricing</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map(t => (
          <div key={t.name} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">{t.name}</h2>
            <div className="text-4xl font-bold mb-4">{t.price}<span className="text-base font-normal text-gray-500">/mo</span></div>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">{t.desc}</p>
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg font-medium">{t.cta}</button>
          </div>
        ))}
      </div>
      <p className="mt-10 text-xs text-gray-500 dark:text-gray-400">All plans include 14‑day free trial. Cancel anytime.</p>
    </div>
  );
}
