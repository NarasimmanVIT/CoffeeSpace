import "../styles/SidebarComponents.css";

const Filters = () => {
  const locations = ["San Francisco", "Austin", "New York", "Remote"];
  const interests = ["Fintech", "AI", "SaaS", "CleanTech"];

  return (
    <div className="filters">
      <h3>Filters</h3>
      <p>Location</p>
      <div className="filters-tags">
        {locations.map((loc) => (
          <span key={loc} className="filters-tag">{loc}</span>
        ))}
      </div>
      <p>Interests</p>
      <div className="filters-tags">
        {interests.map((int) => (
          <span key={int} className="filters-tag">{int}</span>
        ))}
      </div>
    </div>
  );
};

export default Filters;
