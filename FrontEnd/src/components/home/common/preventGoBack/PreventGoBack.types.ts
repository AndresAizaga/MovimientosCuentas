export interface PreventGoBackStates {
    showPreventGoBack: boolean;
}
export interface PreventGoBackCallbacks {
    handleCancelButton: VoidFunction;
    handleDiscard: VoidFunction;
}
export interface UsePreventGoBack {
    callbacks: PreventGoBackCallbacks;
    state: PreventGoBackStates;
}

export interface PreventGoBackProps {
    clearOnPressCancel: VoidFunction;
    handleClose: VoidFunction;
    onPressCancel: boolean;
    state: Record<string, unknown>;
}