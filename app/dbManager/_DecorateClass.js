export default (decorators, target) => {
    decorators = Array.isArray(decorators) ? decorators : [decorators]
    decorators.forEach(decorator => decorator(target))
    return target
}
