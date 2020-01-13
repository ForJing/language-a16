'use babel';

import LanguageA16View from './language-a16-view';
import { CompositeDisposable } from 'atom';

export default {

  languageA16View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageA16View = new LanguageA16View(state.languageA16ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageA16View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-a16:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageA16View.destroy();
  },

  serialize() {
    return {
      languageA16ViewState: this.languageA16View.serialize()
    };
  },

  toggle() {
    console.log('LanguageA16 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
