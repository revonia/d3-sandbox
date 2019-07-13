export default ({
  siteData
}) => {
  const stages = siteData.themeConfig.stages || []
  const stagePromises = siteData.themeConfig.stagePromises = {}
  stages.forEach(name => {
    stagePromises[name] = import(`../../stages/${name}`)
  })
}
