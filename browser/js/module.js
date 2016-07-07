'use strict';

var juke = angular.module('juke', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/albums');

    $stateProvider

    .state('albumList', {
      url: '/albums',
      templateUrl: 'allAlbums.html',
      controller: 'AlbumsCtrl',
      resolve: {
        albums: function (AlbumFactory) {
         return AlbumFactory.fetchAll();
        }
      }
    })
    .state('artistView', {
      url: '/artists',
      templateUrl: 'allArtists.html',
      controller: 'ArtistsCtrl',
      resolve: {
        artists: function(ArtistFactory) {
          return ArtistFactory.fetchAll();
        }
      }
    })
    .state('singleAlbumView', {
      url: '/albums/:albumId',
      templateUrl: 'singleAlbum.html',
      controller: 'AlbumCtrl',
      resolve: {
        album: function(AlbumFactory, $stateParams) {
          return AlbumFactory.fetchById($stateParams.albumId);
        }
      }
    })
    .state('singleArtistView', {
      url: '/artists/:artistId',
      templateUrl: 'singleArtist.html',
      controller: 'ArtistCtrl',
      resolve: {
        artist: function(ArtistFactory, $stateParams) {
          // return $http.get('32f323f32f')
          return ArtistFactory.fetchById($stateParams.artistId);
        }
      }
    })
    .state('singleArtistView.onlyAlbum', {
      url: '/theAlbum',
      templateUrl: 'onlyAlbum.html',
    })
    .state('singleArtistView.onlySongs', {
      url: '/theSongs',
      templateUrl: 'onlySongs.html',
    });

  });

juke.run(function ($rootScope) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.error('Error transitioning from "' + fromState.name + '" to "' + toState.name + '":', error);
  });
});
