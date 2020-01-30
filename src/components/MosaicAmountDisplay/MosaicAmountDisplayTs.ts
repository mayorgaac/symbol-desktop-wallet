/**
 * Copyright 2020 NEM Foundation (https://nem.io)
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {mapGetters} from 'vuex'
import {Component, Prop, Vue} from 'vue-property-decorator'
import {MosaicId, MosaicInfo} from 'nem2-sdk'

// child components
// @ts-ignore
import AmountDisplay from '@/components/AmountDisplay/AmountDisplay.vue'

@Component({
  components: {AmountDisplay},
  computed: {...mapGetters({
    mosaicsInfo: 'mosaic/mosaicsInfoList',
  })}
})
export class MosaicAmountDisplayTs extends Vue {

  @Prop({
    default: null
  }) id: MosaicId
    
  @Prop({
    default: 0
  }) amount: number

  @Prop({
    default: 'green'
  }) color: 'red' | 'green'

  /**
   * Network mosaics info (all)
   * @var {MosaicInfo[]}
   */
  public mosaicsInfo: MosaicInfo[]

  /**
   * Hook called when the component is mounted
   * @return {void}
   */
  public async mounted() {
    const hasInfo = this.mosaicsInfo.find(info => info.id.equals(this.id))
    if (hasInfo === undefined) {
      await this.$store.dispatch('mosaic/REST_FETCH_INFO', this.id)
    }
  }

/// region computed properties getter/setter
  public get divisibility(): number {
    const hasInfo = this.mosaicsInfo.find(info => info.id.equals(this.id))
    return hasInfo === undefined ? 0 : hasInfo.divisibility
  }
/// end-region computed properties getter/setter
}