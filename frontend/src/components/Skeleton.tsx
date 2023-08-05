const Skeleton = () => {
  return (
    <>
      <div className="card">
        <img
          src={"https://files.letsrun.com/images/shoes/shoe-placeholder.png"}
          style={{ width: 100 }}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-8"></span>
          </p>
        </div>
        <div className="card-body">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6"></span>
          </h5>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-8"></span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Skeleton;
