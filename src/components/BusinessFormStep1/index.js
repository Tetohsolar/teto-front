export default function BusinessFormStep1() {
  return (
    <form>
      <h5>Form 1</h5>
      <div className="mb-3">
        <label for="field1" className="form-label">
          Campo A
        </label>
        <input type="text" className="form-control" id="field1" />
      </div>
      <div className="mb-3">
        <label for="field2" className="form-label">
          Campo B
        </label>
        <input type="text" className="form-control" id="field2" />
      </div>
    </form>
  );
}
