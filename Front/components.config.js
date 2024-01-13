function Resolver() {
  return {
    type: 'component',
    resolve: name => {
      if (name === 'RouterView') {
        return { name, from: 'vue-router' }
      }
      return { name, from: '@lucaswerey/dslib-pfe' }
    }
  }
}

module.exports = {
  deep: true,
  dts: 'src/components.d.ts',
  resolvers: [Resolver()]
}
