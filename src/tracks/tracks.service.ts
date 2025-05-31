import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid track ID');
    }

    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };

    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid track ID');
    }

    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException('Track not found');
    }

    const updatedTrack: Track = {
      ...this.tracks[trackIndex],
      name: updateTrackDto.name,
      artistId: updateTrackDto.artistId,
      albumId: updateTrackDto.albumId,
      duration: updateTrackDto.duration,
    };

    this.tracks[trackIndex] = updatedTrack;
    return updatedTrack;
  }

  remove(id: string): void {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid track ID');
    }

    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException('Track not found');
    }

    this.tracks.splice(trackIndex, 1);
  }

  private isValidUUID(id: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
}
