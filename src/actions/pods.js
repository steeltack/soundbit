import Actions from './ActionCreators';

export function addPod(podDetails) {
    return (dispatch, getState) => {
        const { pods } = getState();
        const newPodId =  pods.length ? pods.length + 1 : 0;
        dispatch(Actions.podsCreateOrUpdate({
            id: newPodId,
            users: [1, 2, 3],
            meditationTime: 'date'
        }))
    }
}