/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Utils = require('../../renderer/webgl/Utils');

/**
 * Renders this Game Object with the WebGL Renderer to the given Camera.
 * The object will not render if any of its renderFlags are set or it is being actively filtered out by the Camera.
 * This method should not be called directly. It is a utility function of the Render module.
 *
 * @method Phaser.GameObjects.RenderTexture#renderWebGL
 * @since 3.2.0
 * @private
 *
 * @param {Phaser.Renderer.WebGL.WebGLRenderer} renderer - A reference to the current active Canvas renderer.
 * @param {Phaser.GameObjects.RenderTexture} src - The Game Object being rendered in this call.
 * @param {number} interpolationPercentage - Reserved for future use and custom pipelines.
 * @param {Phaser.Cameras.Scene2D.Camera} camera - The Camera that is rendering the Game Object.
 * @param {Phaser.GameObjects.Components.TransformMatrix} parentMatrix - This transform matrix is defined if the game object is nested
 */
var RenderTextureWebGLRenderer = function (renderer, src, interpolationPercentage, camera, parentMatrix)
{
    var frame = src.frame;
    var width = frame.width;
    var height = frame.height;
    var getTint = Utils.getTintAppendFloatAlpha;
    var pipeline = renderer.pipelines.set(src.pipeline, src);

    var textureUnit = pipeline.setTexture2D(frame.glTexture, src);

    pipeline.batchTexture(
        src,
        frame.glTexture,
        width, height,
        src.x, src.y,
        width, height,
        src.scaleX, src.scaleY,
        src.rotation,
        src.flipX, !src.flipY,
        src.scrollFactorX, src.scrollFactorY,
        src.displayOriginX, src.displayOriginY,
        0, 0, width, height,
        getTint(src._tintTL, camera.alpha * src._alphaTL),
        getTint(src._tintTR, camera.alpha * src._alphaTR),
        getTint(src._tintBL, camera.alpha * src._alphaBL),
        getTint(src._tintBR, camera.alpha * src._alphaBR),
        (src._isTinted && src.tintFill),
        0, 0,
        camera,
        parentMatrix,
        false,
        textureUnit
    );
};

module.exports = RenderTextureWebGLRenderer;
