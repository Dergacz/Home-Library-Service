import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Favorites, FavoritesResponse } from './entities/favorites.entity';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  findAll(): FavoritesResponse {
    const artists = this.favorites.artists
      .map((id) => this.artistsService.findOne(id))
      .filter((artist) => artist !== null);

    const albums = this.favorites.albums
      .map((id) => this.albumsService.findOne(id))
      .filter((album) => album !== null);

    const tracks = this.favorites.tracks
      .map((id) => this.tracksService.findOne(id))
      .filter((track) => track !== null);

    return { artists, albums, tracks };
  }

  addArtist(id: string): void {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid artist ID');
    }

    try {
      this.artistsService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Artist not found');
      }
      throw error;
    }

    if (this.favorites.artists.includes(id)) {
      return;
    }

    this.favorites.artists.push(id);
  }

  removeArtist(id: string): void {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid artist ID');
    }

    const index = this.favorites.artists.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('Artist is not in favorites');
    }

    this.favorites.artists.splice(index, 1);
  }

  addAlbum(id: string): void {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid album ID');
    }

    try {
      this.albumsService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Album not found');
      }
      throw error;
    }

    if (this.favorites.albums.includes(id)) {
      return;
    }

    this.favorites.albums.push(id);
  }

  removeAlbum(id: string): void {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid album ID');
    }

    const index = this.favorites.albums.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('Album is not in favorites');
    }

    this.favorites.albums.splice(index, 1);
  }

  addTrack(id: string): void {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid track ID');
    }

    try {
      this.tracksService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Track not found');
      }
      throw error;
    }

    if (this.favorites.tracks.includes(id)) {
      return;
    }

    this.favorites.tracks.push(id);
  }

  removeTrack(id: string): void {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid track ID');
    }

    const index = this.favorites.tracks.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('Track is not in favorites');
    }

    this.favorites.tracks.splice(index, 1);
  }

  private isValidUUID(id: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
}
