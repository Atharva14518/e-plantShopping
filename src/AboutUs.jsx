import "./AboutUs.css";

function AboutUs() {
  return (
    <section className="about-us" aria-labelledby="about-title">
      <p className="eyebrow">Rooted in care</p>
      <h2 id="about-title">Bring a little paradise home</h2>
      <p>
        At Paradise Nursery, we believe every room feels better with something
        living in it. We select healthy, characterful houseplants and make it
        simple for new and experienced plant parents to find the right match.
      </p>
      <p>
        From calming foliage to aromatic herbs and easy-care favorites, every
        plant is chosen with care and packed to arrive ready to thrive.
      </p>
      <div className="about-highlights" aria-label="Company highlights">
        <span>Carefully selected</span>
        <span>Planet-friendly packing</span>
        <span>Growing guidance</span>
      </div>
    </section>
  );
}

export default AboutUs;
