export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScene', active: false });
    }

    preload() {
        this.load.image("loadingText", "client/assets/ui/load_bar/text.png");
    }

    create() {
        const { width, height } = this.scale;
        const cx = width / 2;
        const cy = height / 2;

        this.overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.85)
            .setOrigin(0)
            .setDepth(9000)
            .setScrollFactor(0)
            .setVisible(false);

        this.loadingText = this.add.image(cx, cy, "loadingText")
            .setOrigin(0.5)
            .setDepth(9001)
            .setScrollFactor(0)
        .setVisible(false);

        this.game.events.on('scene-loading-start', this._show, this);
        this.game.events.on('scene-loading-done',  this._hide, this);

        this.events.on('shutdown', () => {
            this.game.events.off('scene-loading-start', this._show, this);
            this.game.events.off('scene-loading-done',  this._hide, this);
        });
    }

    _show() {
        this.overlay.setVisible(true);
        this.loadingText.setVisible(true);
    }

    _hide() {
        this.overlay.setVisible(false);
        this.loadingText.setVisible(false);
    }
}