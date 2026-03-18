controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Duck`, mySprite, 50, 0)
    animation.runImageAnimation(
    projectile,
    assets.animation`Duck Fly`,
    100,
    true
    )
    if (mySprite.vx < 0) {
        projectile.vx += -200
    }
    projectile.follow(myEnemy)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.confetti, 100)
    bossHealth += -1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    mySprite.x += 30
    info.changeLifeBy(-1)
})
let projectile: Sprite = null
let myEnemy: Sprite = null
let mySprite: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
mySprite = sprites.create(assets.image`Hero`, SpriteKind.Player)
controller.moveSprite(mySprite)
info.setLife(3)
scene.cameraFollowSprite(mySprite)
myEnemy = sprites.create(assets.image`Dog Boss`, SpriteKind.Enemy)
let bossHealth = 30
tiles.placeOnRandomTile(mySprite, assets.tile`Blue`)
tiles.placeOnRandomTile(myEnemy, assets.tile`Red`)
myEnemy.follow(mySprite, 50)
game.onUpdate(function () {
    if (bossHealth == 0) {
        game.gameOver(true)
    }
})
