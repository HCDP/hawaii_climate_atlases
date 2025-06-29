import L from "leaflet";
import { default as PathDragPlugin } from "leaflet-path-drag";

class PathDrag extends PathDragPlugin {
  // Source: https://github.com/w8r/Leaflet.Path.Drag/blob/master/src/Path.Drag.mjs#L161
  _onDrag(evt) {
    L.DomEvent.stop(evt);

    const first =
      evt.touches && evt.touches.length >= 1 ? evt.touches[0] : evt;
    const containerPoint = this._path._map.mouseEventToContainerPoint(first);

    // skip taps
    if (evt.type === 'touchmove' && !this._path._dragMoved) {
      const totalMouseDragDistance =
        this._dragStartPoint.distanceTo(containerPoint);
      if (totalMouseDragDistance <= this._path._map.options.tapTolerance) {
        return;
      }
    }

    const x = containerPoint.x;
    const y = containerPoint.y;

    const dx = x - this._startPoint.x;
    const dy = y - this._startPoint.y;

    // Send events only if point was moved
    if (dx || dy) {
      if (!this._path._dragMoved) {
        this._path._dragMoved = true;
        this._path.options.interactive = false;
        // Original line:
        // this._path._map.dragging._draggable._moved = true;
        // Patched:
        if (this._path._map.dragging?._draggable) {
          this._path._map.dragging._draggable._moved = true;
        }

        this._path.fire('dragstart', evt);
        // we don't want that to happen on click
        this._path.bringToFront();
      }

      this._matrix[4] += dx;
      this._matrix[5] += dy;

      this._startPoint.x = x;
      this._startPoint.y = y;

      this._path.fire('predrag', evt);
      this._path._transform(this._matrix);
      this._path.fire('drag', evt);
    }
  }
}

L.Handler.PathDrag = PathDrag;
