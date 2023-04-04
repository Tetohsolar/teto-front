export default function BusinessFormStep2() {
  return (
    <form>
      <h5>Form 2</h5>
      <div className="mb-3">
        <label for="field3" className="form-label">
          Campo C
        </label>
        <input type="text" className="form-control" id="field3" />
      </div>
      <div className="mb-3">
        <label for="field4" className="form-label">
          Campo D
        </label>
        <input type="text" className="form-control" id="field4" />
      </div>
    </form>
  );
}
