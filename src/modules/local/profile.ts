import { SetupContext, reactive, toRefs } from '@vue/composition-api'
import { Carrer, Skill, Sns, Profile } from '@/types'
import ProfileModel from '@/models/local/ProfileModel'

export default ({ root }: SetupContext) => {
  const state = reactive({
    profile: {} as Profile,
    careers: [] as Carrer[],
    skills: [] as Skill[],
    sns: [] as Sns[],
    loading: false
  })

  async function get() {
    if (state.loading) return
    state.loading = true
    return new ProfileModel()
      .get()
      .then((res: any) => {
        state.profile = res.data
        state.careers = res.data.careers
        state.skills = res.data.skills
        state.sns = res.data.sns
        console.log(state)
      })
      .finally(() => {
        state.loading = false
      })
  }

  return {
    ...toRefs(state),
    get
  }
}
