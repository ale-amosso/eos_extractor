import './Upload_Card.css';


const UploadCard = ({
  file,
  dragOver,
  setDragOver,
  handleDrop,
  mass,
  setMass,
  handleSubmit,
  uploading,
  uploadProgress
}) => {

  return (
    <div className="card">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`card-dropzone ${dragOver ? 'drag-over' : ''}`}>
        {file ? (
          <p> Selected file: {file.name}</p>
        ) : (
          <p>Drag your eos.zip file here</p>
        )}
      </div>

      <div className="card-input-group">
        <input
          type="number"
          value={mass}
          onChange={(e) => setMass(e.target.value)}
          placeholder="Neutron Star Mass [M_☉]"
          className="card-input"
        />

        <button
          onClick={handleSubmit}
          className="card-button"
        >
          Invia
        </button>
      </div>
      {uploading && (
        <div className="card-progress-bar">
          <div
            className="card-progress"
            style={{ width: `${uploadProgress}%` }}
          ></div>
          <p className="card-progress-text">{uploadProgress}%</p>
        </div>
      )}

    </div>
  );
};

export default UploadCard;