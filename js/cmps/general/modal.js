export default {
    template: `
<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
    `
}