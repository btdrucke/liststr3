import {faCheck, faPencil, faTrashCan, faXmark} from "@fortawesome/free-solid-svg-icons"
import IconComponentCreator from "./IconComponentCreator"

export const DoneControl = IconComponentCreator(faCheck)

export const EditControl = IconComponentCreator(faPencil)

export const TrashControl = IconComponentCreator(faTrashCan)

export const DismissControl = IconComponentCreator(faXmark)