import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  TrackingDataRepositoryInterface,
  TrackingDataRepositorySymbol,
} from '@/repositories/trackingData/TrackingDataRepositoryInterface';
import {
  MediaListRepositoryInterface,
  MediaListRepositorySymbol,
} from '@/repositories/mediaList/MediaListRepositoryInterface';
import { MediaItemTrackingDataType } from '@movie-tracker/types';

@Injectable()
export class TrackingDataService {
  constructor(
    @Inject(TrackingDataRepositorySymbol)
    private readonly trackingDataRepository: TrackingDataRepositoryInterface,
    @Inject(MediaListRepositorySymbol)
    private readonly mediaListRepository: MediaListRepositoryInterface,
  ) {}

  private async checkIsMediaListOwner(trackingDataId: string, userId: string) {
    const trackingData =
      await this.trackingDataRepository.getTrackingDataById(trackingDataId);
    const mediaList =
      await this.mediaListRepository.getMedialListByMediaItemAndUserId(
        trackingData.mediaItemId,
        userId,
      );

    if (!mediaList) {
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    }
  }

  async updateTrackingData(
    id: string,
    userId: string,
    data: Partial<
      Omit<
        MediaItemTrackingDataType,
        'id' | 'createdAt' | 'updatedAt' | 'mediaItemId'
      >
    >,
  ) {
    await this.checkIsMediaListOwner(id, userId);

    return this.trackingDataRepository.updateTrackingData(id, data);
  }
}
