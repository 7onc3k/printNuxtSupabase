import { 
    addElemClasses,
    addEvents,
} from "../../../helpers/utils.js";

export default class ViewThumbnails {

    constructor(fpdInstance) {

        this.fpdInstance = fpdInstance;
        
        if(fpdInstance.mainOptions.viewThumbnailsWrapper) {

            this.container = document.querySelector(fpdInstance.mainOptions.viewThumbnailsWrapper);
            if(this.container) {

                addElemClasses(
                    this.container,
                    ['fpd-view-thumbnails-wrapper']
                )

                addEvents(
                    this.fpdInstance,
                    ['viewCreate', 'viewRemove', 'viewMove'],
                    this.#updateGrid.bind(this)
                )

            }

        }

    }

    #updateGrid(evt) {

        this.container.innerHTML = '';
        this.fpdInstance.viewInstances.forEach((viewInst, i) => {
                        
            const viewItem = document.createElement('div');
            viewItem.className = 'fpd-item fpd-tooltip fpd-shadow-1';
            viewItem.setAttribute('aria-label', viewInst.title);
            viewItem.style.backgroundImage = `url("${viewInst.thumbnail}")`
            this.container.append(viewItem);

            addEvents(
                viewItem,
                'click',
                () => {

                    this.fpdInstance.selectView(i);

                }
            )            

        });

    }

}