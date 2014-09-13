Light.Game.prototype.zoom = function(delta) {
  var oldScale = this.scaler.scale.x;  // We always scale both co-ordinates equally.
  var scale = oldScale + delta;
  // Don't zoom out if the whole world is visible (clip it right on the edge).
  scale = Math.max(scale, game.camera.view.width / this.mapWidth);
  scale = Math.max(scale, game.camera.view.height / this.mapHeight);
  var scaleCoef = scale / oldScale;
  var scaledMouseX = game.input.mousePointer.worldX * scaleCoef;
  var scaledMouseY = game.input.mousePointer.worldY * scaleCoef;
  var deltaMouseX = scaledMouseX - game.input.mousePointer.worldX;
  var deltaMouseY = scaledMouseY - game.input.mousePointer.worldY;
  this.scaler.scale.set(scale);
  game.world.width = scale * this.mapWidth;
  game.world.height = scale * this.mapHeight;
  game.camera.setBoundsToWorld();
  game.camera.focusOnXY(
      game.camera.view.centerX + deltaMouseX,
      game.camera.view.centerY + deltaMouseY);
};